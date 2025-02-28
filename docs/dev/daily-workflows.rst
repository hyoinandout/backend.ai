Daily Development Workflows
===========================

About Pants
-----------

Since 22.09, we have migrated to `Pants <https://pantsbuild.org>`_ as our
primary build system and dependency manager for the mono-repository of Python
components.

Pants is a graph-based async-parallel task executor written in Rust and Python.
It is tailored to building programs with explicit and auto-inferred
dependency checks and aggressive caching.

Key concepts
~~~~~~~~~~~~

* The command pattern:

  .. code-block:: console

      $ pants [GLOBAL_OPTS] GOAL [GOAL_OPTS] [TARGET ...]

* Goal: an action to execute

  - You may think this as the root node of the task graph executed by Pants.

* Target: objectives for the action, usually expressed as ``path/to/dir:name``

  - The targets are declared/defined by ``path/to/dir/BUILD`` files.

* The global configuration is at ``pants.toml``.

* Recommended reading: https://www.pantsbuild.org/docs/concepts

Inspecting build configurations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Display all targets

  .. code-block:: console

      $ pants list ::

  - This list includes the full enumeration of individual targets auto-generated
    by collective targets (e.g., ``python_sources()`` generates multiple
    ``python_source()`` targets by globbing the ``sources`` pattern)

* Display all dependencies of a specific target (i.e., all targets required to
  build this target)

  .. code-block:: console

      $ pants dependencies --transitive src/ai/backend/common:src

* Display all dependees of a specific target (i.e., all targets affected when
  this target is changed)

  .. code-block:: console

      $ pants dependees --transitive src/ai/backend/common:src

.. note::

   Pants statically analyzes the source files to enumerate all its imports
   and determine the dependencies automatically.  In most cases this works well,
   but sometimes you may need to manually declare explicit dependencies in
   ``BUILD`` files.

Running lint and check
----------------------

Run lint/check for all targets:

.. code-block:: console

    $ pants lint ::
    $ pants check ::

To run lint/check for a specific target or a set of targets:

.. code-block:: console

    $ pants lint src/ai/backend/common:: tests/common::
    $ pants check src/ai/backend/manager::

Currently running mypy with pants is slow because mypy cannot utilize its own cache as pants invokes mypy per file due to its own dependency management scheme.
(e.g., Checking all sources takes more than 1 minutes!)
This performance issue is being tracked by `pantsbuild/pants#10864
<https://github.com/pantsbuild/pants/issues/10864>`_.  For now, try using a
smaller target of files that you work on and `use an option to select the
targets only changed
<https://www.pantsbuild.org/docs/advanced-target-selection#running-over-changed-files-with---changed-since>`_ (``--changed-since``).

Running formatters
------------------

If you encounter failure from ``isort``, you may run the formatter to automatically fix the import ordering issues.

.. code-block:: console

   $ pants fmt ::
   $ pants fmt src/ai/backend/common::

Running unit tests
------------------

Here are various methods to run tests:

.. code-block:: console

    $ pants test ::
    $ pants test tests/manager/test_scheduler.py::
    $ pants test tests/manager/test_scheduler.py:: -- -k test_scheduler_configs
    $ pants test tests/common::            # Run common/**/test_*.py
    $ pants test tests/common:tests        # Run common/test_*.py
    $ pants test tests/common/redis::      # Run common/redis/**/test_*.py
    $ pants test tests/common/redis:tests  # Run common/redis/test_*.py

You may also try ``--changed-since`` option like ``lint`` and ``check``.

To specify extra environment variables for tests, use the ``--test-extra-env-vars``
option:

.. code-block:: console

    $ pants test \
    >   --test-extra-env-vars=MYVARIABLE=MYVALUE \
    >   tests/common:tests

Running integration tests
-------------------------

.. code-block:: console

    $ ./backend.ai test run-cli user,admin

Building wheel packages
-----------------------

To build a specific package:

.. code-block:: console

    $ pants \
    >   --tag="wheel" \
    >   package \
    >   src/ai/backend/common:dist
    $ ls -l dist/*.whl

If the package content varies by the target platform, use:

.. code-block:: console

    $ pants \
    >   --tag="wheel" \
    >   --tag="+platform-specific" \
    >   --platform-specific-resources-target=linux_arm64 \
    >   package \
    >   src/ai/backend/runner:dist
    $ ls -l dist/*.whl

Using IDEs and editors
----------------------

Pants has an ``export`` goal to auto-generate a virtualenv that contains all
external dependencies installed in a single place.
This is very useful when you use IDEs and editors.

To (re-)generate the virtualenv(s), run:

.. code-block:: console

    $ pants export --resolve=RESOLVE_NAME  # you may add multiple --resolve options

You may display the available resolve names by (the command works with Python 3.11 or later):

.. code-block:: console

    $ python -c 'import tomllib,pathlib;print("\n".join(tomllib.loads(pathlib.Path("pants.toml").read_text())["python"]["resolves"].keys()))'

Similarly, you can export all virtualenvs at once:

.. code-block:: console

    $ python -c 'import tomllib,pathlib;print("\n".join(tomllib.loads(pathlib.Path("pants.toml").read_text())["python"]["resolves"].keys()))' | sed 's/^/--resolve=/' | xargs ./pants export

Then configure your IDEs/editors to use
``dist/export/python/virtualenvs/python-default/PYTHON_VERSION/bin/python`` as the
interpreter for your code, where ``PYTHON_VERSION`` is the interpreter version
specified in ``pants.toml``.

As of Pants 2.16, you must export the virtualenvs by the individual lockfiles
using the ``--resolve`` option, as all tools are unified to use the same custom resolve subsystem of Pants and the ``::`` target no longer works properly, like:

.. code-block:: console

    $ pants export --resolve=python-default --resolve=mypy

To make LSP (language server protocol) services like PyLance to detect our source packages correctly,
you should also configure ``PYTHONPATH`` to include the repository root's ``src`` directory and
``plugins/*/`` directories if you have added Backend.AI plugin checkouts.

For linters and formatters, configure the tool executable paths to indicate
``dist/export/python/virtualenvs/RESOLVE_NAME/PYTHON_VERSION/bin/EXECUTABLE``.
For example, flake8's executable path is
``dist/export/python/virtualenvs/flake8/3.11.3/bin/flake8``.

Currently we have the following Python tools to configure in this way:

* ``flake8``: Validates PEP-8 coding style

  .. info::

     Due to limitation of Pants, ``./pants export --resolve=flake8`` only creates a venv
     for the Python version of the ``python-default`` resolve, while the
     ``pants-plugins`` resolve uses Python 3.9.x.
     ``./pants lint`` correctly uses both Python versions because it can infer
     existence of multiple resolve partitions from the entire sourec tree, but
     this is not the case for ``./pants export``.

* ``mypy``: Validates the type annotations

* ``black``: Validates and reformats all Python codes by reconstructing it from AST,
  just like ``gofmt``.

  .. tip::

     For a long list of arguments or list/tuple items, you could explicitly add a
     trailing comma to force Black to insert line-breaks after every item even when
     the line length does not exceed the limit (100 characters).

  .. tip::

     You may disable auto-formatting on a specific region of code using ``# fmt: off``
     and ``# fmt: on`` comments, though this is strongly discouraged except when
     manual formatting gives better readability, such as numpy matrix declarations.

* ``isort``: Validates and reorders import statements in a fixed order depending on
  the categories of imported packages (such as bulitins, first-parties, and
  third-parties), the alphabetical order, and whether it uses ``from`` or not.

* ``pytest``: The unit test runner framework.

* ``coverage-py``: Generates reports about which source lines were visited during execution of a pytest session.

* ``towncrier``: Generates the changelog from news fragments in the ``changes`` directory when making a new release.

VSCode
~~~~~~

Set the following keys in the workspace settings:

* ``flake8``: ``python.linting.flake8Path``

* ``mypy``: ``python.linting.mypyPath``

* ``black``: ``python.formatting.blackPath``

* ``isort``: ``python.sortImports.path``

.. warning::

   When the target Python version has changed when you pull a new version/branch, you need to re-run ``pants export``
   and manually update the Python interpreter path and mypy executable path configurations.

Vim/NeoVim
~~~~~~~~~~

There are a large variety of plugins and usually heavy Vimmers should know what to do.

We recommend using `ALE <https://github.com/dense-analysis/ale>`_ or
`CoC <https://github.com/neoclide/coc.nvim>`_ plugins to have automatic lint highlights,
auto-formatting on save, and auto-completion support with code navigation via LSP backends.

.. warning::

   Note that it is recommended to enable only one linter/formatter at a time (either ALE or CoC)
   with proper configurations, to avoid duplicate suggestions and error reports.

When using ALE, it is recommended to have a directory-local vimrc as follows.
First, add ``set exrc`` in your user-level vimrc.
Then put the followings in ``.vimrc`` (or ``.nvimrc`` for NeoVim) in the build root directory:

.. code-block:: vim

   let s:cwd = getcwd()
   let g:ale_python_isort_executable = s:cwd . '/dist/export/python/virtualenvs/isort/3.11.3/bin/isort'  " requires absolute path
   let g:ale_python_black_executable = s:cwd . '/dist/export/python/virtualenvs/black/3.11.3/bin/black'  " requires absolute path
   let g:ale_python_flake8_executable = s:cwd . '/dist/export/python/virtualenvs/flake8/3.11.3/bin/flake8'
   let g:ale_python_mypy_executable = s:cwd . '/dist/export/python/virtualenvs/mypy/3.11.3/bin/mypy'
   let g:ale_fixers = {'python': ['isort', 'black']}
   let g:ale_fix_on_save = 1

When using CoC, run ``:CocInstall coc-pyright`` and ``:CocLocalConfig`` after opening a file
in the local working copy to initialize PyRight functionalities.
In the local configuration file (``.vim/coc-settings.json``), you may put the linter/formatter configurations
just like VSCode (see `the official reference <https://www.npmjs.com/package/coc-pyright>`_):

.. code-block:: json

   {
     "coc.preferences.formatOnType": true,
     "coc.preferences.formatOnSaveFiletypes": ["python"],
     "coc.preferences.willSaveHandlerTimeout": 5000,
     "python.pythonPath": "dist/export/python/virtualenvs/python-default/3.11.3/bin/python",
     "python.formatting.provider": "black",
     "python.formatting.blackPath": "dist/export/python/virtualenvs/black/3.11.3/bin/black",
     "python.sortImports.path": "dist/export/python/virtualenvs/isort/3.11.3/bin/isort",
     "python.linting.mypyEnabled": true,
     "python.linting.flake8Enabled": true,
     "python.linting.mypyPath": "dist/export/python/virtualenvs/mypy/3.11.3/bin/mypy",
     "python.linting.flake8Path": "dist/export/python/virtualenvs/flake8/3.11.3/bin/flake8"
   }


Switching between branches
~~~~~~~~~~~~~~~~~~~~~~~~~~

When each branch has different external package requirements, you should run ``pants export``
before running codes after ``git switch``-ing between such branches.

Sometimes, you may experience bogus "glob" warning from pants because it sees a stale cache.
In that case, run ``pgrep pantsd | xargs kill`` and it will be fine.

Running entrypoints
-------------------

To run a Python program within the unified virtualenv, use the ``./py`` helper
script.  It automatically passes additional arguments transparently to the
Python executable of the unified virtualenv.

``./backend.ai`` is an alias of ``./py -m ai.backend.cli``.

Examples:

.. code-block:: console

    $ ./py -m ai.backend.storage.server
    $ ./backend.ai mgr start-server
    $ ./backend.ai ps

Working with plugins
--------------------

To develop Backend.AI plugins together, the repository offers a special location
``./plugins`` where you can clone plugin repositories and a shortcut script
``scripts/install-plugin.sh`` that does this for you.

.. code-block:: console

    $ scripts/install-plugin.sh lablup/backend.ai-accelerator-cuda-mock

This is equivalent to:

.. code-block:: console

    $ git clone \
    >   https://github.com/lablup/backend.ai-accelerator-cuda-mock \
    >   plugins/backend.ai-accelerator-cuda-mock

These plugins are auto-detected by scanning ``setup.cfg`` of plugin subdirectories
by the ``ai.backend.plugin.entrypoint`` module, even without explicit editable installations.

Writing test cases
------------------

Mostly it is just same as before: use the standard pytest practices.
Though, there are a few key differences:

- Tests are executed **in parallel** in the unit of test modules.

- Therefore, session-level fixtures may be executed *multiple* times during a
  single run of ``pants test``.

.. warning::

  If you *interrupt* (Ctrl+C, SIGINT) a run of ``pants test``, it will
  immediately kill all pytest processes without fixture cleanup. This may
  accumulate unused Docker containers in your system, so it is a good practice
  to run ``docker ps -a`` periodically and clean up dangling containers.

  To interactively run tests, see :ref:`debugging-tests`.

Here are considerations for writing Pants-friendly tests:

* Ensure that it runs in an isolated/mocked environment and minimize external dependency.

* If required, use the environment variable ``BACKEND_TEST_EXEC_SLOT`` (an integer
  value) to uniquely define TCP port numbers and other resource identifiers to
  allow parallel execution.
  `Refer the Pants docs <https://www.pantsbuild.org/docs/reference-pytest#section-execution-slot-var](https://www.pantsbuild.org/docs/reference-pytest#section-execution-slot-var>`_.

* Use ``ai.backend.testutils.bootstrap`` to populate a single-node
  Redis/etcd/Postgres container as fixtures of your test cases.
  Import the fixture and use it like a plain pytest fixture.

  - These fixtures create those containers with **OS-assigned public port
    numbers** and give you a tuple of container ID and a
    ``ai.backend.common.types.HostPortPair`` for use in test codes. In manager and
    agent tests, you could just refer ``local_config`` to get a pre-populated
    local configurations with those port numbers.

  - In this case, you may encounter ``flake8`` complaining about unused imports
    and redefinition. Use ``# noqa: F401`` and ``# noqa: F811`` respectively for now.

.. warning::

   **About using /tmp in tests**

   If your Docker service is installed using **Snap** (e.g., Ubuntu 20.04 or
   later), it cannot access the system ``/tmp`` directory because Snap applies a
   private "virtualized" tmp directory to the Docker service.

   You should use other locations under the user's home directory (or
   preferably ``.tmp`` in the working copy directory) to avoid mount failures
   for the developers/users in such platforms.

   It is okay to use the system ``/tmp`` directory if they are not mounted inside
   any containers.

Writing documentation
---------------------

* Create a new pyenv virtualenv based on Python 3.10.

  .. code-block:: console

     $ pyenv virtualenv 3.10.9 venv-bai-docs

* Activate the virtualenv and run:

  .. code-block:: console

     $ pyenv activate venv-bai-docs
     $ pip install -U pip setuptools wheel
     $ pip install -U -r docs/requirements.txt

* You can build the docs as follows:

  .. code-block:: console

     $ cd docs
     $ pyenv activate venv-bai-docs
     $ make html

* To locally serve the docs:

  .. code-block:: console

     $ cd docs
     $ python -m http.server --directory=_build/html

(TODO: Use Pants' own Sphinx support when `pantsbuild/pants#15512 <https://github.com/pantsbuild/pants/pull/15512>`_ is released.)


Advanced Topics
---------------

Adding new external dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Add the package version requirements to the unified requirements file (``./requirements.txt``).

* Update the ``module_mapping`` field in the root build configuration (``./BUILD``)
  if the package name and its import name differs.

* Update the ``type_stubs_module_mapping`` field in the root build configuration
  if the package provides a type stubs package separately.

* Run:

  .. code-block:: console

     $ pants generate-lockfiles
     $ pants export

Merging lockfile conflicts
~~~~~~~~~~~~~~~~~~~~~~~~~~

When you work on a branch that adds a new external dependency and the main branch has also
another external dependency addition, merging the main branch into your branch is likely to
make a merge conflict on ``python.lock`` file.

In this case, you can just do the followings since we can just *regenerate* the lockfile
after merging ``requirements.txt`` and ``BUILD`` files.

.. code-block:: console

   $ git merge main
   ... it says a conflict on python.lock ...
   $ git checkout --theirs python.lock
   $ pants generate-lockfiles --resolve=python-default
   $ git add python.lock
   $ git commit

Resetting Pants
~~~~~~~~~~~~~~~

If Pants behaves strangely, you could simply reset all its runtime-generated files by:

.. code-block:: console

   $ pgrep pantsd | xargs kill
   $ rm -r .tmp/immutable* .pants.d .pids ~/.cache/pants

After this, re-running any Pants command will automatically reinitialize itself and
all cached data as necessary.

.. warning::

   If you have run ``pants`` or the installation script with ``sudo``, some of the above directories
   may be owned by root and running ``pants`` as the user privilege would not work.
   In such cases, remove the directories with ``sudo`` and retry.

Changing or updating the Python runtime for Pants
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you run ``scripts/install-dev.sh``, it automatically creates ``.pants.bootstrap``
to explicitly set a specific pyenv Python version to run Pants.

If you have removed/upgraded this specific Python version from pyenv, you also need to
update ``.pants.bootstrap`` accordingly.

.. _debugging-tests:

Debugging test cases (or interactively running test cases)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When your tests *hang*, you can try adding the ``--debug`` flag to the ``pants test`` command:

.. code-block:: console

   $ pants test --debug ...

so that Pants runs the designated test targets **serially and interactively**.
This means that you can directly observe the console output and Ctrl+C to
gracefully shutdown the tests  with fixture cleanup. You can also apply
additional pytest options such as ``--fulltrace``, ``-s``, etc. by passing them
after target arguments and ``--`` when executing ``pants test`` command.

Installing a subset of mono-repo packages in the editable mode for other projects
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes, you need to editable-install a subset of packages into other project's directories.
For instance you could mount the client SDK and its internal dependencies for a Docker container for development.

In this case, we recommend to do it as follows:

1. Run the following command to build a wheel from the current mono-repo source:

   .. code-block:: console

      $ pants --tag=wheel package src/ai/backend/client:dist

   This will generate ``dist/backend.ai_client-{VERSION}-py3-none-any.whl``.

2. Run ``pip install -U {MONOREPO_PATH}/dist/{WHEEL_FILE}`` in the target environment.

   This will populate the package metadata and install its external dependencies.
   The target environment may be one of a separate virtualenv or a container being built.
   For container builds, you need to first ``COPY`` the wheel file and install it.

3. Check the internal dependency directories to link by running the following command:

   .. code-block:: console

      $ pants dependencies --transitive src/ai/backend/client:src \
      >   | grep src/ai/backend | grep -v ':version' | cut -d/ -f4 | uniq
      cli
      client
      plugin

4. Link these directories in the target environment.

   For example, if it is a Docker container, you could add
   ``-v {MONOREPO_PATH}/src/ai/backend/{COMPONENT}:/usr/local/lib/python3.10/site-packages/ai/backend/{COMPONENT}``
   to the ``docker create`` or ``docker run`` commands for all the component
   directories found in the previous step.

   If it is a local checkout with a pyenv-based virtualenv, you could replace
   ``$(pyenv prefix)/lib/python3.10/site-packages/ai/backend/{COMPONENT}`` directories
   with symbolic links to the mono-repo's component source directories.

Boosting the performance of Pants commands
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Since Pants uses temporary directories for aggressive caching, you could make
the ``.tmp`` directory under the working copy root a tmpfs partition:

.. code-block:: console

   $ sudo mount -t tmpfs -o size=4G tmpfs .tmp

* To make this persistent across reboots, add the following line to ``/etc/fstab``:

  .. code-block:: text

     tmpfs /path/to/dir/.tmp tmpfs defaults,size=4G 0 0

* The size should be more than 3GB.
  (Running ``pants test ::`` consumes about 2GB.)

* To change the size at runtime, you could simply remount it with a new size option:

  .. code-block:: console

     $ sudo mount -t tmpfs -o remount,size=8G tmpfs .tmp

Making a new release
~~~~~~~~~~~~~~~~~~~~

* Update ``./VERSION`` file to set a new version number. (Remove the ending new
  line, e.g., using ``set noeol`` in Vim.  This is also configured in
  ``./editorconfig``)

* Run ``LOCKSET=tools/towncrier ./py -m towncrier`` to auto-generate the changelog.

  - You may append ``--draft`` to see a preview of the changelog update without
    actually modifying the filesystem.

  - (WIP: `lablup/backend.ai#427 <https://github.com/lablup/backend.ai/pull/427>`_).

* Make a new git commit with the commit message: "release: <version>".

* Make an annotated tag to the commit with the message: "Release v<version>"
  or "Pre-release v<version>" depending on the release version.

* Push the commit and tag.  The GitHub Actions workflow will build the packages
  and publish them to PyPI.

Backporting to legacy per-pkg repositories
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Use ``git diff`` and ``git apply`` instead of ``git cherry-pick``.

  - To perform a three-way merge for conflicts, add ``-3`` option to the ``git apply`` command.

  - You may need to rewrite some codes as the package structure differs. (The
    new mono repository has more fine-grained first party packages divided from
    the ``backend.ai-common`` package.)

* When referring the PR/issue numbers in the commit for per-pkg repositories,
  update them like ``lablup/backend.ai#NNN`` instead of ``#NNN``.
