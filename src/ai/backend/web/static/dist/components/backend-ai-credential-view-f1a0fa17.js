import{_ as e,e as t,c as i,a as s,B as o,d as a,I as l,b as r,x as n,f as c,i as d,h as u,g as p,Z as h,y as m,t as v,K as g,a1 as y,a2 as _}from"./backend-ai-webui-661d9e43.js";import"./mwc-tab-bar-064ccbb5.js";import"./tab-group-6baff1e0.js";import"./expansion-9d1f3a9b.js";import"./label-1ef3652f.js";import"./lablup-activity-panel-0289184a.js";import"./vaadin-grid-c3d5c3c2.js";import"./vaadin-grid-filter-column-4c9cb29f.js";import"./vaadin-grid-sort-column-7bed08ef.js";import"./vaadin-iconset-07d3debe.js";import"./vaadin-item-0d805f04.js";import"./backend-ai-list-status-5163ce5c.js";import"./lablup-grid-sort-filter-column-9ffbb621.js";import"./backend-ai-multi-select-ddd96cfb.js";import"./switch-1f68b491.js";import"./textfield-6b6134ab.js";import"./mwc-switch-e9473fc7.js";import{J as b}from"./json_to_csv-35c9e191.js";import"./radio-behavior-b66ed7c9.js";import"./dir-utils-38e4cf3d.js";import"./vaadin-item-mixin-88cba3b7.js";import"./mwc-check-list-item-c64cf1a4.js";
/**
 @license
 Copyright (c) 2015-2023 Lablup Inc. All rights reserved.
 */var f;class w extends Error{constructor(e){super(e),Object.setPrototypeOf(this,w.prototype),this.title="Unable to delete keypair"}}let x=f=class extends o{constructor(){super(),this.keypairInfo={user_id:"1",access_key:"ABC",secret_key:"ABC",last_used:"",is_admin:!1,resource_policy:"",rate_limit:5e3,concurrency_used:0,num_queries:0,created_at:""},this.isAdmin=!1,this.condition="active",this.keypairs=[],this.resourcePolicy=Object(),this.indicator=Object(),this._boundKeyageRenderer=this.keyageRenderer.bind(this),this._boundControlRenderer=this.controlRenderer.bind(this),this._boundAccessKeyRenderer=this.accessKeyRenderer.bind(this),this._boundPermissionRenderer=this.permissionRenderer.bind(this),this._boundResourcePolicyRenderer=this.resourcePolicyRenderer.bind(this),this._boundAllocationRenderer=this.allocationRenderer.bind(this),this._boundUserIdRenderer=this.userIdRenderer.bind(this),this.keypairGrid=Object(),this.listCondition="loading",this._totalCredentialCount=0,this.isUserInfoMaskEnabled=!1,this.deleteKeyPairUserName="",this.deleteKeyPairAccessKey=""}static get styles(){return[a,l,r,n,c,d`
        vaadin-grid {
          border: 0;
          font-size: 14px;
          height: calc(100vh - 229px);
        }

        mwc-icon-button {
          --mdc-icon-size: 24px;
          padding: 0;
        }

        mwc-icon {
          --mdc-icon-size: 16px;
          padding: 0;
        }

        vaadin-item {
          font-size: 13px;
          font-weight: 100;
        }

        vaadin-item div[secondary] {
          font-weight: 400;
        }

        div.indicator,
        span.indicator {
          font-size: 9px;
          margin-right: 5px;
        }

        div.configuration {
          width: 100px !important;
        }

        div.configuration mwc-icon {
          padding-right: 5px;
        }

        #keypair-modify-save {
          --button-bg: var(--paper-light-green-50);
          --button-bg-hover: var(--paper-green-100);
          --button-bg-active: var(--paper-green-600);
        }

        #policy-list {
          width: 100%;
        }

        backend-ai-dialog {
          --component-min-width: 400px;
        }

        backend-ai-dialog h4 {
          font-size: 14px;
          padding: 5px 15px 5px 12px;
          margin: 0 0 10px 0;
          display: block;
          height: 20px;
          border-bottom: 1px solid #DDD;
        }

        mwc-button, mwc-button[unelevated], mwc-button[outlined] {
          background-image: none;
          --mdc-theme-primary: var(--general-button-background-color);
          --mdc-theme-on-primary: var(--general-button-color);
          --mdc-typography-font-family: var(--general-font-family);
        }

        mwc-select {
          --mdc-theme-primary: var(--general-sidebar-color);
        }
      `]}firstUpdated(){this.notification=globalThis.lablupNotification}async _viewStateChanged(e){var t;await this.updateComplete,!1!==e&&(void 0===globalThis.backendaiclient||null===globalThis.backendaiclient||!1===globalThis.backendaiclient.ready?document.addEventListener("backend-ai-connected",(()=>{var e;this._refreshKeyData(),this.isAdmin=globalThis.backendaiclient.is_admin,this.isUserInfoMaskEnabled=globalThis.backendaiclient._config.maskUserInfo,this.keypairGrid=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#keypair-grid")}),!0):(this._refreshKeyData(),this.isAdmin=globalThis.backendaiclient.is_admin,this.isUserInfoMaskEnabled=globalThis.backendaiclient._config.maskUserInfo,this.keypairGrid=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#keypair-grid")))}_refreshKeyData(e=null){var t;let i=!0;if("active"===this.condition)i=!0;else i=!1;return this.listCondition="loading",null===(t=this._listStatus)||void 0===t||t.show(),globalThis.backendaiclient.resourcePolicy.get().then((e=>{const t=e.keypair_resource_policies;this.resourcePolicy=globalThis.backendaiclient.utils.gqlToObject(t,"name")})).then((()=>globalThis.backendaiclient.keypair.list(e,["access_key","is_active","is_admin","user_id","created_at","last_used","concurrency_limit","concurrency_used","rate_limit","num_queries","resource_policy"],i))).then((e=>{var t;const i=e.keypairs;Object.keys(i).map(((e,t)=>{const s=i[e];if(s.resource_policy in this.resourcePolicy){for(const e in this.resourcePolicy[s.resource_policy])"created_at"!==e&&(s[e]=this.resourcePolicy[s.resource_policy][e],"total_resource_slots"===e&&(s.total_resource_slots=JSON.parse(this.resourcePolicy[s.resource_policy][e])));s.created_at_formatted=this._humanReadableTime(s.created_at),s.elapsed=this._elapsed(s.created_at),"cpu"in s.total_resource_slots||"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.cpu="-"),"mem"in s.total_resource_slots?s.total_resource_slots.mem=parseFloat(globalThis.backendaiclient.utils.changeBinaryUnit(s.total_resource_slots.mem,"g")):"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.mem="-"),"cuda.device"in s.total_resource_slots&&(s.total_resource_slots.cuda_device=s.total_resource_slots["cuda.device"]),"cuda.shares"in s.total_resource_slots&&(s.total_resource_slots.cuda_shares=s.total_resource_slots["cuda.shares"]),"cuda_device"in s.total_resource_slots==!1&&"cuda_shares"in s.total_resource_slots==!1&&"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.cuda_shares="-",s.total_resource_slots.cuda_device="-"),"rocm.device"in s.total_resource_slots&&(s.total_resource_slots.rocm_device=s.total_resource_slots["rocm.device"]),"rocm_device"in s.total_resource_slots==!1&&"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.rocm_device="-"),"tpu.device"in s.total_resource_slots&&(s.total_resource_slots.tpu_device=s.total_resource_slots["tpu.device"]),"tpu_device"in s.total_resource_slots==!1&&"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.tpu_device="-"),"ipu.device"in s.total_resource_slots&&(s.total_resource_slots.ipu_device=s.total_resource_slots["ipu.device"]),"ipu_device"in s.total_resource_slots==!1&&"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.ipu_device="-"),"atom.device"in s.total_resource_slots&&(s.total_resource_slots.tpu_device=s.total_resource_slots["atom.device"]),"atom_device"in s.total_resource_slots==!1&&"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.atom_device="-"),["cpu","mem","cuda_shares","cuda_device","rocm_device","tpu_device","ipu_device","atom_device"].forEach((e=>{s.total_resource_slots[e]=this._markIfUnlimited(s.total_resource_slots[e])})),s.max_vfolder_size=this._markIfUnlimited(f.bytesToGB(s.max_vfolder_size))}})),this.keypairs=i,0==this.keypairs.length?this.listCondition="no-data":null===(t=this._listStatus)||void 0===t||t.hide()})).catch((e=>{var t;null===(t=this._listStatus)||void 0===t||t.hide(),console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}async _showKeypairDetail(e){const t=e.target.closest("#controls")["access-key"];try{const e=await this._getKeyData(t);this.keypairInfo=e.keypair,this.keypairInfoDialog.show()}catch(e){e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}}async _modifyResourcePolicy(e){const t=e.target.closest("#controls")["access-key"];try{const e=await this._getKeyData(t);this.keypairInfo=e.keypair,this.policyListSelect.value=this.keypairInfo.resource_policy,this.rateLimit.value=this.keypairInfo.rate_limit.toString(),this.keypairModifyDialog.show()}catch(e){e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}}async _getKeyData(e){return globalThis.backendaiclient.keypair.info(e,["access_key","secret_key","is_active","is_admin","user_id","created_at","last_used","concurrency_limit","concurrency_used","rate_limit","num_queries","resource_policy"])}refresh(){this._refreshKeyData()}_isActive(){return"active"===this.condition}_deleteKeyPairDialog(e){const t=e.target.closest("#controls"),i=t["user-id"],s=t["access-key"];this.deleteKeyPairUserName=i,this.deleteKeyPairAccessKey=s,this.deleteKeyPairDialog.show()}_deleteKey(e){globalThis.backendaiclient.keypair.delete(this.deleteKeyPairAccessKey).then((e=>{if(e.delete_keypair&&!e.delete_keypair.ok)throw new w(e.delete_keypair.msg);this.notification.text=p("credential.KeySeccessfullyDeleted"),this.notification.show(),this.refresh(),this.deleteKeyPairDialog.hide()})).catch((e=>{console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}_revokeKey(e){this._mutateKey(e,!1)}_reuseKey(e){this._mutateKey(e,!0)}_mutateKey(e,t){const i=e.target.closest("#controls")["access-key"],s=this.keypairs.find(this._findKeyItem,i),o={is_active:t,is_admin:s.is_admin,resource_policy:s.resource_policy,rate_limit:s.rate_limit,concurrency_limit:s.concurrency_limit};globalThis.backendaiclient.keypair.mutate(i,o).then((e=>{const t=new CustomEvent("backend-ai-credential-refresh",{detail:this});document.dispatchEvent(t)})).catch((e=>{console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}_findKeyItem(e){return e.access_key=this}_elapsed(e,t){const i=new Date(e),s=(this.condition,new Date),o=Math.floor((s.getTime()-i.getTime())/1e3);return Math.floor(o/86400)}_humanReadableTime(e){return new Date(e).toUTCString()}_indexRenderer(e,t,i){const s=i.index+1;h(m`
        <div>${s}</div>
      `,e)}_markIfUnlimited(e){return["-",0,"Unlimited",1/0,"Infinity"].includes(e)?"∞":e}keyageRenderer(e,t,i){h(m`
        <div class="layout vertical">
          <span>${i.item.elapsed} ${v("credential.Days")}</span>
          <span class="indicator">(${i.item.created_at_formatted})</span>
        </div>
      `,e)}controlRenderer(e,t,i){h(m`
        <div id="controls" class="layout horizontal flex center"
             .access-key="${i.item.access_key}" .user-id="${i.item.user_id}">
          <mwc-icon-button class="fg green" icon="assignment" fab flat inverted
                           @click="${e=>this._showKeypairDetail(e)}">
          </mwc-icon-button>
          <mwc-icon-button class="fg blue" icon="settings" fab flat inverted
                           @click="${e=>this._modifyResourcePolicy(e)}">
          </mwc-icon-button>
          ${this.isAdmin&&this._isActive()?m`
            <mwc-icon-button class="fg blue" icon="delete" fab flat inverted @click="${e=>this._revokeKey(e)}">
            </mwc-icon-button>
            <mwc-icon-button class="fg red" icon="delete_forever" fab flat inverted
                             @click="${e=>this._deleteKeyPairDialog(e)}">
            </mwc-icon-button>
          `:m``}
          ${!1===this._isActive()?m`
            <mwc-icon-button class="fg blue" icon="redo" fab flat inverted @click="${e=>this._reuseKey(e)}">
            </mwc-icon-button>
          `:m``}
        </div>
      `,e)}accessKeyRenderer(e,t,i){h(m`
        <div class="monospace">${i.item.access_key}</div>
      `,e)}permissionRenderer(e,t,i){h(m`
        <div class="layout horizontal center flex">
          ${i.item.is_admin?m`
            <lablup-shields app="" color="red" description="admin" ui="flat"></lablup-shields>
          `:m``}
          <lablup-shields app="" description="user" ui="flat"></lablup-shields>
        </div>
      `,e)}resourcePolicyRenderer(e,t,i){h(m`
        <div class="layout horizontal wrap center">
          <span>${i.item.resource_policy}</span>
        </div>
        <div class="layout horizontal wrap center">
          <div class="layout horizontal configuration">
            <mwc-icon class="fg green">developer_board</mwc-icon>
            <span>${i.item.total_resource_slots.cpu}</span>
            <span class="indicator">${v("general.cores")}</span>
          </div>
          <div class="layout horizontal configuration">
            <mwc-icon class="fg green">memory</mwc-icon>
            <span>${i.item.total_resource_slots.mem}</span>
            <span class="indicator">GiB</span>
          </div>
        </div>
        <div class="layout horizontal wrap center">
          ${i.item.total_resource_slots.cuda_device?m`
            <div class="layout horizontal configuration">
              <mwc-icon class="fg green">view_module</mwc-icon>
              <span>${i.item.total_resource_slots.cuda_device}</span>
              <span class="indicator">GPU</span>
            </div>
          `:m``}
          ${i.item.total_resource_slots.cuda_shares?m`
            <div class="layout horizontal configuration">
              <mwc-icon class="fg green">view_module</mwc-icon>
              <span>${i.item.total_resource_slots.cuda_shares}</span>
              <span class="indicator">fGPU</span>
            </div>
          `:m``}
        </div>
        <div class="layout horizontal wrap center">
          <div class="layout horizontal configuration">
            <mwc-icon class="fg green">cloud_queue</mwc-icon>
            <span>${i.item.max_vfolder_size}</span>
            <span class="indicator">GB</span>
          </div>
          <div class="layout horizontal configuration">
            <mwc-icon class="fg green">folder</mwc-icon>
            <span>${i.item.max_vfolder_count}</span>
            <span class="indicator">${v("general.Folders")}</span>
          </div>
        </div>
      `,e)}allocationRenderer(e,t,i){h(m`
        <div class="layout horizontal center flex">
          <div class="vertical start layout">
            <div style="font-size:11px;width:40px;">
              ${i.item.concurrency_used} / ${i.item.concurrency_limit}
            </div>
            <span class="indicator">Sess.</span>
          </div>
          <div class="vertical start layout">
            <span style="font-size:8px">${i.item.rate_limit} <span class="indicator">req./15m.</span></span>
            <span style="font-size:8px">${i.item.num_queries} <span class="indicator">queries</span></span>
          </div>
        </div>
      `,e)}userIdRenderer(e,t,i){h(m`
        <span>${this._getUserId(i.item.user_id)}</span>
      `,e)}_validateRateLimit(){this.rateLimit.validityTransform=(e,t)=>t.valid?0!==e.length&&!isNaN(Number(e))&&Number(e)<100?(this.rateLimit.validationMessage=p("credential.WarningLessRateLimit"),{valid:!t.valid,customError:!t.valid}):{valid:t.valid,customError:!t.valid}:t.valueMissing?(this.rateLimit.validationMessage=p("credential.RateLimitInputRequired"),{valid:t.valid,customError:!t.valid}):t.rangeOverflow?(this.rateLimit.value=e=5e4.toString(),this.rateLimit.validationMessage=p("credential.RateLimitValidation"),{valid:t.valid,customError:!t.valid}):t.rangeUnderflow?(this.rateLimit.value=e="1",this.rateLimit.validationMessage=p("credential.RateLimitValidation"),{valid:t.valid,customError:!t.valid}):(this.rateLimit.validationMessage=p("credential.InvalidRateLimitValue"),{valid:t.valid,customError:!t.valid})}openDialog(e){var t;(null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#"+e)).show()}closeDialog(e){var t;(null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#"+e)).hide()}_saveKeypairModification(e=!1){const t=this.policyListSelect.value,i=Number(this.rateLimit.value);if(!(this.rateLimit.checkValidity()||i<100&&e))return i<100&&!e?void this.openDialog("keypair-confirmation"):void 0;let s={};t!==this.keypairInfo.resource_policy&&(s={...s,resource_policy:t}),i!==this.keypairInfo.rate_limit&&(s={...s,rate_limit:i}),0===Object.entries(s).length?(this.notification.text=p("credential.NoChanges"),this.notification.show()):globalThis.backendaiclient.keypair.mutate(this.keypairInfo.access_key,s).then((e=>{e.modify_keypair.ok?(this.keypairInfo.resource_policy===t&&this.keypairInfo.rate_limit===i?this.notification.text=p("credential.NoChanges"):this.notification.text=p("environment.SuccessfullyModified"),this.refresh()):this.notification.text=p("dialog.ErrorOccurred"),this.notification.show()})),this.closeDialog("keypair-modify-dialog")}_confirmAndSaveKeypairModification(){this.closeDialog("keypair-confirmation"),this._saveKeypairModification(!0)}_adjustRateLimit(){const e=Number(this.rateLimit.value);e>5e4&&(this.rateLimit.value=5e4.toString()),e<=0&&(this.rateLimit.value="1")}static bytesToGB(e,t=1){return e?(e/10**9).toFixed(t):e}_getUserId(e=""){if(this.isUserInfoMaskEnabled){const t=2,i=e.split("@")[0].length-t;e=globalThis.backendaiutils._maskString(e,"*",t,i)}return e}_getAccessKey(e=""){if(this.isUserInfoMaskEnabled){const t=4,i=e.length-t;e=globalThis.backendaiutils._maskString(e,"*",t,i)}return e}render(){return m`
      <div class="list-wrapper">
        <vaadin-grid theme="row-stripes column-borders compact" aria-label="Credential list"
                     id="keypair-grid" .items="${this.keypairs}">
          <vaadin-grid-column width="40px" flex-grow="0" header="#" text-align="center"
                              .renderer="${this._indexRenderer.bind(this)}"></vaadin-grid-column>
          <lablup-grid-sort-filter-column path="user_id" auto-width header="${v("credential.UserID")}" resizable
                                     .renderer="${this._boundUserIdRenderer}"></lablup-grid-sort-filter-column>
          <lablup-grid-sort-filter-column path="access_key" auto-width header="${v("general.AccessKey")}" resizable
                                     .renderer="${this._boundAccessKeyRenderer}"></lablup-grid-sort-filter-column>
          <vaadin-grid-sort-column resizable header="${v("credential.Permission")}" path="admin"
                                   .renderer="${this._boundPermissionRenderer}"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column auto-width resizable header="${v("credential.KeyAge")}" path="created_at"
                                   .renderer="${this._boundKeyageRenderer}"></vaadin-grid-sort-column>
          <vaadin-grid-column auto-width resizable header="${v("credential.ResourcePolicy")}"
                              .renderer="${this._boundResourcePolicyRenderer}"></vaadin-grid-column>
          <vaadin-grid-column auto-width resizable header="${v("credential.Allocation")}"
                              .renderer="${this._boundAllocationRenderer}"></vaadin-grid-column>
          <vaadin-grid-column width="208px" resizable header="${v("general.Control")}"
                              .renderer="${this._boundControlRenderer}">
          </vaadin-grid-column>
        </vaadin-grid>
        <backend-ai-list-status id="list-status" statusCondition="${this.listCondition}"
                                message="${p("credential.NoCredentialToDisplay")}"></backend-ai-list-status>
      </div>
      <backend-ai-dialog id="delete-keypair-dialog" fixed backdrop>
        <span slot="title">${v("dialog.title.LetsDouble-Check")}</span>
        <div slot="content">
          <p>You are deleting the credentials of user <span style="color:red">${this.deleteKeyPairUserName}</span>.</p>
          <p>${v("dialog.ask.DoYouWantToProceed")}</p>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout">
          <mwc-button
              label="${v("button.Cancel")}"
              @click="${e=>this._hideDialog(e)}"></mwc-button>
          <mwc-button
              unelevated
              label="${v("button.Okay")}"
              @click="${e=>this._deleteKey(e)}"></mwc-button>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="keypair-info-dialog" fixed backdrop blockscrolling container="${document.body}">
        <span slot="title">${v("credential.KeypairDetail")}</span>
        <div slot="action" class="horizontal end-justified flex layout">
          ${this.keypairInfo.is_admin?m`
            <lablup-shields class="layout horizontal center" app="" color="red" description="admin" ui="flat"></lablup-shields>
          `:m``}
          <lablup-shields class="layout horizontal center" app="" description="user" ui="flat"></lablup-shields>
        </div>
        <div slot="content" class="intro">
          <div class="horizontal layout">
            <div style="width:335px;">
              <h4>${v("credential.Information")}</h4>
              <div role="listbox" style="margin: 0;">
                <vaadin-item>
                  <div><strong>${v("credential.UserID")}</strong></div>
                  <div secondary>${this.keypairInfo.user_id}</div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("general.AccessKey")}</strong></div>
                  <div secondary>${this.keypairInfo.access_key}</div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("general.SecretKey")}</strong></div>
                  <div secondary>${this.keypairInfo.secret_key}</div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("credential.Created")}</strong></div>
                  <div secondary>${this.keypairInfo.created_at}</div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("credential.Lastused")}</strong></div>
                  <div secondary>${this.keypairInfo.last_used}</div>
                </vaadin-item>
              </div>
            </div>
            <div style="width:335px;">
              <h4>${v("credential.Allocation")}</h4>
              <div role="listbox" style="margin: 0;">
                <vaadin-item>
                  <div><strong>${v("credential.ResourcePolicy")}</strong></div>
                  <div secondary>${this.keypairInfo.resource_policy}</div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("credential.NumberOfQueries")}</strong></div>
                  <div secondary>${this.keypairInfo.num_queries}</div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("credential.ConcurrentSessions")}</strong></div>
                  <div secondary>${this.keypairInfo.concurrency_used} ${v("credential.active")} /
                    ${this.keypairInfo.concurrency_used} ${v("credential.concurrentsessions")}.
                  </div>
                </vaadin-item>
                <vaadin-item>
                  <div><strong>${v("credential.RateLimit")}</strong></div>
                  <div secondary>${this.keypairInfo.rate_limit} ${v("credential.for900seconds")}.</div>
                </vaadin-item>
              </div>
            </div>
          </div>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="keypair-modify-dialog" fixed backdrop blockscrolling>
        <span slot="title">${v("credential.ModifyKeypairResourcePolicy")}</span>

        <div slot="content" class="vertical layout">
          <div class="vertical layout center-justified">
            <mwc-select
              id="policy-list"
              label="${v("credential.SelectPolicy")}">
              ${Object.keys(this.resourcePolicy).map((e=>m`
                  <mwc-list-item value=${this.resourcePolicy[e].name}>
                    ${this.resourcePolicy[e].name}
                  </mwc-list-item>`))}
            </mwc-select>
          </div>
          <div class="vertical layout center-justified">
            <mwc-textfield
                type="number"
                id="rate-limit"
                min="1"
                max="50000"
                label="${v("credential.RateLimit")}"
                validationMessage="${v("credential.RateLimitValidation")}"
                helper="${v("credential.RateLimitValidation")}"
                @change="${()=>this._validateRateLimit()}"
                value="${this.keypairInfo.rate_limit}"></mwc-textfield>
          </div>
        </div>
        <div slot="footer" class="horizontal center-justified flex layout">
          <mwc-button
              unelevated
              fullwidth
              id="keypair-modify-save"
              icon="check"
              label="${v("button.SaveChanges")}"
              @click="${()=>this._saveKeypairModification()}"></mwc-button>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="keypair-confirmation" warning fixed>
        <span slot="title">${v("dialog.title.LetsDouble-Check")}</span>
        <div slot="content">
          <p>${v("credential.WarningLessRateLimit")}</p>
          <p>${v("dialog.ask.DoYouWantToProceed")}</p>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout">
          <mwc-button
              label="${p("button.Cancel")}"
              @click="${e=>this._hideDialog(e)}"
              style="width:auto;margin-right:10px;">
          </mwc-button>
          <mwc-button
              unelevated
              label="${p("button.DismissAndProceed")}"
              @click="${()=>this._confirmAndSaveKeypairModification()}"
              style="width:auto;">
          </mwc-button>
        </div>
      </backend-ai-dialog>
    `}};
/**
 @license
Copyright (c) 2015-2023 Lablup Inc. All rights reserved.
*/
var k;e([t({type:Object})],x.prototype,"notification",void 0),e([t({type:Object})],x.prototype,"keypairInfo",void 0),e([t({type:Boolean})],x.prototype,"isAdmin",void 0),e([t({type:String})],x.prototype,"condition",void 0),e([t({type:Array})],x.prototype,"keypairs",void 0),e([t({type:Object})],x.prototype,"resourcePolicy",void 0),e([t({type:Object})],x.prototype,"indicator",void 0),e([t({type:Object})],x.prototype,"_boundKeyageRenderer",void 0),e([t({type:Object})],x.prototype,"_boundControlRenderer",void 0),e([t({type:Object})],x.prototype,"_boundAccessKeyRenderer",void 0),e([t({type:Object})],x.prototype,"_boundPermissionRenderer",void 0),e([t({type:Object})],x.prototype,"_boundResourcePolicyRenderer",void 0),e([t({type:Object})],x.prototype,"_boundAllocationRenderer",void 0),e([t({type:Object})],x.prototype,"_boundUserIdRenderer",void 0),e([t({type:Object})],x.prototype,"keypairGrid",void 0),e([t({type:String})],x.prototype,"listCondition",void 0),e([t({type:Number})],x.prototype,"_totalCredentialCount",void 0),e([t({type:Boolean})],x.prototype,"isUserInfoMaskEnabled",void 0),e([t({type:String})],x.prototype,"deleteKeyPairUserName",void 0),e([t({type:String})],x.prototype,"deleteKeyPairAccessKey",void 0),e([i("#keypair-info-dialog")],x.prototype,"keypairInfoDialog",void 0),e([i("#keypair-modify-dialog")],x.prototype,"keypairModifyDialog",void 0),e([i("#delete-keypair-dialog")],x.prototype,"deleteKeyPairDialog",void 0),e([i("#policy-list")],x.prototype,"policyListSelect",void 0),e([i("#rate-limit")],x.prototype,"rateLimit",void 0),e([i("#list-status")],x.prototype,"_listStatus",void 0),x=f=e([s("backend-ai-credential-list")],x);class ${static getValue(){return 1e6}}let I=k=class extends o{constructor(){super(),this.visible=!1,this.listCondition="loading",this.keypairs={},this.resourcePolicy=[],this.keypairInfo={},this.active=!1,this.condition="active",this.current_policy_name="",this.enableSessionLifetime=!1,this.enableParsingStoragePermissions=!1,this._boundResourceRenderer=Object(),this._boundConcurrencyRenderer=this.concurrencyRenderer.bind(this),this._boundControlRenderer=this.controlRenderer.bind(this),this._boundPolicyNameRenderer=this.policyNameRenderer.bind(this),this._boundClusterSizeRenderer=this.clusterSizeRenderer.bind(this),this._boundStorageNodesRenderer=this.storageNodesRenderer.bind(this),this.is_super_admin=!1,this.all_vfolder_hosts=[],this.allowed_vfolder_hosts={},this.vfolderPermissions=[],this.resource_policy_names=[],this._boundResourceRenderer=this.resourceRenderer.bind(this)}static get styles(){return[a,l,r,d`
        vaadin-grid {
          border: 0;
          font-size: 14px;
          height: calc(100vh - 229px);
        }

        wl-icon.indicator {
          width: 16px;
          height: 16px;
          --icon-size: 16px;
          min-width: 16px;
          min-height: 16px;
          padding: 0;
        }

        wl-button {
          --button-fab-size: 40px;
          margin-right: 5px;
        }

        wl-button[disabled].fg {
          color: rgba(0,0,0,0.4) !important;
        }

        vaadin-item {
          font-size: 13px;
          font-weight: 100;
        }

        div.indicator,
        span.indicator {
          font-size: 9px;
          margin-right: 5px;
        }

        div.configuration {
          width: 100px !important;
        }

        div.configuration wl-icon {
          padding-right: 5px;
        }

        div.sessions-section {
          width: 167px;
          margin-bottom: 10px;
        }

        wl-label {
          width: 100%;
          min-width: 60px;
          font-size: 10px; // 11px;
          --label-font-family: 'Ubuntu', Roboto;
        }

        wl-label.folders {
          margin: 3px 0px 7px 0px;
        }

        wl-label.unlimited {
          margin: 4px 0px 0px 0px;
        }

        wl-label.unlimited > wl-checkbox {
          border-width: 1px;
        }

        wl-list-item {
          width: 100%;
        }

        wl-checkbox {
          --checkbox-size: 10px;
          --checkbox-border-radius: 2px;
          --checkbox-bg-checked: var(--general-checkbox-color);
          --checkbox-checkmark-stroke-color: white;
          --checkbox-color-checked: white;
        }

        mwc-textfield {
          width: 100%;
          --mdc-text-field-fill-color: transparent;
          --mdc-theme-primary: var(--general-textfield-selected-color);
          --mdc-typography-font-family: var(--general-font-family);
        }

        mwc-textfield.resource-input {
          width: 5rem;
        }

        mwc-button, mwc-button[unelevated] {
          background-image: none;
          --mdc-theme-primary: var(--general-button-background-color);
          --mdc-theme-on-primary: var(--general-button-color);
          --mdc-typography-font-family: var(--general-font-family);
        }

        mwc-list-item {
          --mdc-menu-item-height: auto;
          font-size : 14px;
        }

        backend-ai-dialog {
          --component-min-width: 350px;
          --component-max-width: 390px;
        }
        backend-ai-dialog h4 {
          font-size: 14px;
          padding: 5px 15px 5px 12px;
          margin: 0 0 10px 0;
          display: block;
          height: 20px;
          border-bottom: 1px solid #DDD;
        }
        div.popup-right-margin {
          margin-right: 5px;
        }
        div.popup-left-margin {
          margin-left: 5px;
        }
        div.popup-both-margin {
          margin-left: 5px;
          margin-right: 5px;
        }
      `]}render(){return m`
      <div class="list-wrapper">
        <vaadin-grid theme="row-stripes column-borders compact" aria-label="Resource Policy list"
                    .items="${this.resourcePolicy}">
          <vaadin-grid-column width="40px" flex-grow="0" header="#" text-align="center" .renderer="${this._indexRenderer}"></vaadin-grid-column>
          <vaadin-grid-sort-column resizable header="${v("resourcePolicy.Name")}" path="name" .renderer="${this._boundPolicyNameRenderer}"></vaadin-grid-sort-column>
          <vaadin-grid-column width="150px" resizable header="${v("resourcePolicy.Resources")}" .renderer="${this._boundResourceRenderer}">
          </vaadin-grid-column>
          <vaadin-grid-column resizable header="${v("resourcePolicy.Concurrency")}" .renderer="${this._boundConcurrencyRenderer}">
          </vaadin-grid-column>
          <vaadin-grid-sort-column resizable header="${v("resourcePolicy.ClusterSize")}" path="max_containers_per_session"
              .renderer="${this._boundClusterSizeRenderer}"></vaadin-grid-sort-column>
          <vaadin-grid-column resizable header="${v("resourcePolicy.StorageNodes")}" .renderer="${this._boundStorageNodesRenderer}">
          </vaadin-grid-column>
          <vaadin-grid-column resizable header="${v("general.Control")}" .renderer="${this._boundControlRenderer}">
          </vaadin-grid-column>
        </vaadin-grid>
        <backend-ai-list-status id="list-status" statusCondition="${this.listCondition}" message="${p("resourcePolicy.NoResourcePolicyToDisplay")}"></backend-ai-list-status>
      </div>
      <backend-ai-dialog id="modify-policy-dialog" fixed backdrop blockscrolling narrowLayout>
        <span slot="title">${v("resourcePolicy.UpdateResourcePolicy")}</span>
        <div slot="content">
          <mwc-textfield id="id_new_policy_name" label="${v("resourcePolicy.PolicyName")}" disabled></mwc-textfield>
          <h4>${v("resourcePolicy.ResourcePolicy")}</h4>
          <div class="horizontal justified layout distancing">
            <div class="vertical layout popup-right-margin">
              <wl-label>CPU</wl-label>
              <mwc-textfield class="discrete resource-input" id="cpu-resource" type="number" min="0" max="512"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
            </div>
            <div class="vertical layout popup-both-margin">
              <wl-label>RAM(GB)</wl-label>
              <mwc-textfield class="resource-input" id="ram-resource" type="number" min="0" max="100000" step="0.01"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical layout popup-both-margin">
              <wl-label>GPU</wl-label>
              <mwc-textfield class="discrete resource-input" id="gpu-resource" type="number" min="0" max="64"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical layout popup-left-margin">
              <wl-label>fGPU</wl-label>
              <mwc-textfield class="resource-input" id="fgpu-resource" type="number" min="0" max="256" step="0.1"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
          </div>
          <h4>${v("resourcePolicy.Sessions")}</h4>
          <div class="horizontal layout justified distancing wrap">
            <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}">
              <wl-label>${v("resourcePolicy.ContainerPerSession")}</wl-label>
              <mwc-textfield class="discrete" id="container-per-session-limit" type="number" min="0" max="100"
                  @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}">
              <wl-label>${v("resourcePolicy.IdleTimeoutSec")}</wl-label>
              <mwc-textfield class="discrete" id="idle-timeout" type="number" min="0" max="15552000"
                  @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}">
              <wl-label>${v("resourcePolicy.ConcurrentJobs")}</wl-label>
              <mwc-textfield class="discrete" id="concurrency-limit" type="number" min="0" max="100"
                  @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}"
                style="${this.enableSessionLifetime?"":"display:none;"}">
              <wl-label>${v("resourcePolicy.MaxSessionLifeTime")}</wl-label>
              <mwc-textfield class="discrete" id="session-lifetime" type="number" min="0" max="100"
                  @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
          </div>
          <h4 style="margin-bottom:0px;">${v("resourcePolicy.Folders")}</h4>
          <div class="vertical center layout distancing" id="dropdown-area">
            <backend-ai-multi-select open-up id="allowed-vfolder-hosts" label="${v("resourcePolicy.AllowedHosts")}" style="width:100%;"></backend-ai-multi-select>
            <div class="horizontal layout justified" style="width:100%;">
              <div class="vertical layout flex popup-right-margin">
                <wl-label class="folders">${v("resourcePolicy.Capacity")}(GB)</wl-label>
                <mwc-textfield id="vfolder-capacity-limit" type="number" min="0" max="1024" step="0.1"
                    @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
              </div>
              <div class="vertical layout flex popup-left-margin">
                <wl-label class="folders">${v("credential.Max#")}</wl-label>
                <mwc-textfield class="discrete" id="vfolder-count-limit" type="number" min="0" max="50"
                    @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout distancing">
          <mwc-button
              unelevated
              fullwidth
              id="create-policy-button"
              icon="check"
              label="${v("button.Update")}"
              @click="${()=>this._modifyResourcePolicy()}"></mwc-button>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="delete-policy-dialog" fixed backdrop blockscrolling>
        <span slot="title">${v("dialog.title.LetsDouble-Check")}</span>
        <div slot="content">
          <p>${v("resourcePolicy.AboutToDeleteResourcePolicy")}</p>
          <p style="text-align:center;color:blue;">${this.current_policy_name}</p>
          <p>${v("dialog.warning.CannotBeUndone")} ${v("dialog.ask.DoYouWantToProceed")}</p>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout">
          <mwc-button
                class="operation"
                label="${v("button.Cancel")}"
                @click="${e=>this._hideDialog(e)}"></mwc-button>
            <mwc-button
                unelevated
                class="operation"
                label="${v("button.Okay")}"
                @click="${()=>this._deleteResourcePolicy()}"></mwc-button>
        </div>
      </backend-ai-dialog>
    `}_indexRenderer(e,t,i){const s=i.index+1;h(m`
        <div>${s}</div>
      `,e)}_displayResourcesByResourceUnit(e=0,t=!1,i=""){let s=0;const o=this._markIfUnlimited(e,t);switch(i=i.toLowerCase()){case"cpu":case"cuda_device":case"max_vfolder_count":s=0;break;case"mem":case"cuda_shares":case"max_vfolder_size":s=1}return["∞","-"].includes(o)?o:Number(o).toFixed(s)}resourceRenderer(e,t,i){h(m`
        <div class="layout horizontal wrap center">
          <div class="layout horizontal configuration">
            <wl-icon class="fg green indicator">developer_board</wl-icon>
            <span>${this._displayResourcesByResourceUnit(i.item.total_resource_slots.cpu,!1,"cpu")}</span>
            <span class="indicator">cores</span>
          </div>
          <div class="layout horizontal configuration">
            <wl-icon class="fg green indicator">memory</wl-icon>
            <span>${this._displayResourcesByResourceUnit(i.item.total_resource_slots.mem,!1,"mem")}</span>
            <span class="indicator">GB</span>
          </div>
        </div>
        <div class="layout horizontal wrap center">
        ${i.item.total_resource_slots.cuda_device?m`
          <div class="layout horizontal configuration">
            <wl-icon class="fg green indicator">view_module</wl-icon>
            <span>${this._displayResourcesByResourceUnit(i.item.total_resource_slots.cuda_device,!1,"cuda_device")}</span>
            <span class="indicator">GPU</span>
          </div>
`:m``}
        ${i.item.total_resource_slots.cuda_shares?m`
          <div class="layout horizontal configuration">
            <wl-icon class="fg green indicator">view_module</wl-icon>
            <span>${this._displayResourcesByResourceUnit(i.item.total_resource_slots.cuda_shares,!1,"cuda_shares")}</span>
            <span class="indicator">fGPU</span>
          </div>
`:m``}
        </div>
        <div class="layout horizontal wrap center">
          <div class="layout horizontal configuration">
            <wl-icon class="fg green indicator">cloud_queue</wl-icon>
            <span>${this._displayResourcesByResourceUnit(i.item.max_vfolder_size,!0,"max_vfolder_size")}</span>
            <span class="indicator">GB</span>
          </div>
          <div class="layout horizontal configuration">
            <wl-icon class="fg green indicator">folder</wl-icon>
            <span>${this._displayResourcesByResourceUnit(i.item.max_vfolder_count,!1,"max_vfolder_count")}</span>
            <span class="indicator">Folders</span>
          </div>
        </div>
      `,e)}concurrencyRenderer(e,t,i){h(m`
        <div>${[0,$.getValue()].includes(i.item.max_concurrent_sessions)?"∞":i.item.max_concurrent_sessions}</div>
    `,e)}controlRenderer(e,t,i){h(m`
        <div id="controls" class="layout horizontal flex center" .policy-name="${i.item.name}">
          <wl-button fab flat inverted class="fg blue controls-running" ?disabled=${!this.is_super_admin}
                      @click="${e=>this._launchResourcePolicyDialog(e)}">
            <wl-icon>settings</wl-icon>
          </wl-button>
          <wl-button fab flat inverted class="fg red controls-running" ?disabled=${!this.is_super_admin}
                      @click="${e=>this._openDeleteResourcePolicyListDialog(e)}">
            <wl-icon>delete</wl-icon>
          </wl-button>
      `,e)}policyNameRenderer(e,t,i){h(m`
      <div class="layout horizontal center flex">
        <div>${i.item.name}</div>
      </div>
      `,e)}clusterSizeRenderer(e,t,i){h(m`
      <div>${[0,$.getValue()].includes(i.item.max_containers_per_session)?"∞":i.item.max_containers_per_session}</div>
      `,e)}storageNodesRenderer(e,t,i){let s=JSON.parse(i.item.allowed_vfolder_hosts);this.enableParsingStoragePermissions&&(s=Object.keys(s)),h(m`
      <div class="layout horizontal center flex">
        <div class="vertical start layout around-justified">
          ${s.map((e=>m`
            <lablup-shields app="" color="darkgreen" ui="round" description="${e}" style="margin-bottom:3px;"></lablup-shields>`))}
        </div>
      </div>
      `,e)}firstUpdated(){this.notification=globalThis.lablupNotification,this.selectAreaHeight=this.dropdownArea.offsetHeight?this.dropdownArea.offsetHeight:"123px"}async _viewStateChanged(e){await this.updateComplete,!1!==e&&(void 0===globalThis.backendaiclient||null===globalThis.backendaiclient||!1===globalThis.backendaiclient.ready?document.addEventListener("backend-ai-connected",(()=>{this.enableSessionLifetime=globalThis.backendaiclient.supports("session-lifetime"),this.enableParsingStoragePermissions=globalThis.backendaiclient.supports("fine-grained-storage-permissions"),this.is_super_admin=globalThis.backendaiclient.is_superadmin,this._refreshPolicyData(),this.enableParsingStoragePermissions&&this._getVfolderPermissions()}),!0):(this.enableSessionLifetime=globalThis.backendaiclient.supports("session-lifetime"),this.enableParsingStoragePermissions=globalThis.backendaiclient.supports("fine-grained-storage-permissions"),this.is_super_admin=globalThis.backendaiclient.is_superadmin,this._refreshPolicyData(),this.enableParsingStoragePermissions&&this._getVfolderPermissions()))}_getVfolderPermissions(){globalThis.backendaiclient.storageproxy.getAllPermissions().then((e=>{this.vfolderPermissions=e.vfolder_host_permission_list}))}_launchResourcePolicyDialog(e){this.updateCurrentPolicyToDialog(e),this._getAllStorageHostsInfo().then((()=>{this.allowedVfolderHostsSelect.items=this.all_vfolder_hosts,this.allowedVfolderHostsSelect.selectedItemList=this.allowed_vfolder_hosts,this.modifyPolicyDialog.show()})).catch((e=>{e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}_openDeleteResourcePolicyListDialog(e){this.updateCurrentPolicyToDialog(e),this.deletePolicyDialog.show()}updateCurrentPolicyToDialog(e){const t=e.target.closest("#controls")["policy-name"],i=globalThis.backendaiclient.utils.gqlToObject(this.resourcePolicy,"name");this.resource_policy_names=Object.keys(i);const s=i[t];let o;o=this.enableParsingStoragePermissions?Object.keys(JSON.parse(s.allowed_vfolder_hosts)):s.allowed_vfolder_hosts,this.newPolicyName.value=t,this.current_policy_name=t,this.cpuResource.value=this._updateUnlimitedValue(s.total_resource_slots.cpu),this.ramResource.value=this._updateUnlimitedValue(s.total_resource_slots.mem),this.gpuResource.value=this._updateUnlimitedValue(s.total_resource_slots.cuda_device),this.fgpuResource.value=this._updateUnlimitedValue(s.total_resource_slots.cuda_shares),this.concurrencyLimit.value=this._updateUnlimitedValue(s.max_concurrent_sessions),this.idleTimeout.value=this._updateUnlimitedValue(s.idle_timeout),this.containerPerSessionLimit.value=this._updateUnlimitedValue(s.max_containers_per_session),this.vfolderCapacityLimit.value=this._updateUnlimitedValue(s.max_vfolder_size),this.enableSessionLifetime&&(this.sessionLifetime.value=this._updateUnlimitedValue(s.max_session_lifetime),this._updateInputStatus(this.sessionLifetime)),this._updateInputStatus(this.cpuResource),this._updateInputStatus(this.ramResource),this._updateInputStatus(this.gpuResource),this._updateInputStatus(this.fgpuResource),this._updateInputStatus(this.concurrencyLimit),this._updateInputStatus(this.idleTimeout),this._updateInputStatus(this.containerPerSessionLimit),this._updateInputStatus(this.vfolderCapacityLimit),this.vfolderCountLimitInput.value=s.max_vfolder_count,this.vfolderCapacityLimit.value=k.bytesToGB(s.max_vfolder_size,1),this.allowed_vfolder_hosts=o}_refreshPolicyData(){var e;return this.listCondition="loading",null===(e=this._listStatus)||void 0===e||e.show(),globalThis.backendaiclient.resourcePolicy.get().then((e=>e.keypair_resource_policies)).then((e=>{var t;const i=e;Object.keys(i).map(((e,t)=>{const s=i[e];s.total_resource_slots=JSON.parse(s.total_resource_slots),"cpu"in s.total_resource_slots||"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.cpu="Unlimited"),"mem"in s.total_resource_slots?s.total_resource_slots.mem=parseFloat(globalThis.backendaiclient.utils.changeBinaryUnit(s.total_resource_slots.mem,"g")):"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.mem="Unlimited"),"cuda.device"in s.total_resource_slots?0===s.total_resource_slots["cuda.device"]&&"UNLIMITED"===s.default_for_unspecified?s.total_resource_slots.cuda_device="Unlimited":s.total_resource_slots.cuda_device=s.total_resource_slots["cuda.device"]:"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.cuda_device="Unlimited"),"cuda.shares"in s.total_resource_slots?0===s.total_resource_slots["cuda.shares"]&&"UNLIMITED"===s.default_for_unspecified?s.total_resource_slots.cuda_shares="Unlimited":s.total_resource_slots.cuda_shares=s.total_resource_slots["cuda.shares"]:"UNLIMITED"===s.default_for_unspecified&&(s.total_resource_slots.cuda_shares="Unlimited")})),this.resourcePolicy=i,0==Object.keys(this.resourcePolicy).length?this.listCondition="no-data":null===(t=this._listStatus)||void 0===t||t.hide()})).catch((e=>{var t;null===(t=this._listStatus)||void 0===t||t.hide(),console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}refresh(){this._refreshPolicyData()}_isActive(){return"active"===this.condition}static bytesToGB(e,t=0){const i=Math.pow(10,t);return(Math.round(e/10**9*i)/i).toFixed(t)}static gBToBytes(e=0){return Math.round(10**9*e)}_parseSelectedAllowedVfolderHostWithPermissions(e){const t={};return e.forEach((e=>{Object.assign(t,{[e]:this.vfolderPermissions})})),t}_readResourcePolicyInput(){const e={};let t;t=this.enableParsingStoragePermissions?JSON.stringify(this._parseSelectedAllowedVfolderHostWithPermissions(this.allowedVfolderHostsSelect.selectedItemList)):this.allowedVfolderHostsSelect.selectedItemList,this._validateUserInput(this.cpuResource),this._validateUserInput(this.ramResource),this._validateUserInput(this.gpuResource),this._validateUserInput(this.fgpuResource),this._validateUserInput(this.concurrencyLimit),this._validateUserInput(this.idleTimeout),this._validateUserInput(this.containerPerSessionLimit),this._validateUserInput(this.vfolderCapacityLimit),this._validateUserInput(this.vfolderCountLimitInput),e.cpu=this.cpuResource.value,e.mem=this.ramResource.value+"g",e["cuda.device"]=parseInt(this.gpuResource.value),e["cuda.shares"]=parseFloat(this.fgpuResource.value),this.concurrencyLimit.value=["",0].includes(this.concurrencyLimit.value)?$.getValue().toString():this.concurrencyLimit.value,this.idleTimeout.value=""===this.idleTimeout.value?"0":this.idleTimeout.value,this.containerPerSessionLimit.value=["",0].includes(this.containerPerSessionLimit.value)?$.getValue().toString():this.containerPerSessionLimit.value,this.vfolderCapacityLimit.value=""===this.vfolderCapacityLimit.value?"0":this.vfolderCapacityLimit.value,this.vfolderCountLimitInput.value=""===this.vfolderCountLimitInput.value?"0":this.vfolderCountLimitInput.value,Object.keys(e).map((t=>{isNaN(parseFloat(e[t]))&&delete e[t]}));const i={default_for_unspecified:"UNLIMITED",total_resource_slots:JSON.stringify(e),max_concurrent_sessions:this.concurrencyLimit.value,max_containers_per_session:this.containerPerSessionLimit.value,idle_timeout:this.idleTimeout.value,max_vfolder_count:this.vfolderCountLimitInput.value,max_vfolder_size:k.gBToBytes(Number(this.vfolderCapacityLimit.value)),allowed_vfolder_hosts:t};return this.enableSessionLifetime&&(this._validateUserInput(this.sessionLifetime),this.sessionLifetime.value=""===this.sessionLifetime.value?"0":this.sessionLifetime.value,i.max_session_lifetime=this.sessionLifetime.value),i}_modifyResourcePolicy(){try{const e=this._readResourcePolicyInput();globalThis.backendaiclient.resourcePolicy.mutate(this.current_policy_name,e).then((({modify_keypair_resource_policy:e})=>{e.ok?(this.modifyPolicyDialog.hide(),this.notification.text=p("resourcePolicy.SuccessfullyUpdated"),this.notification.show(),this.refresh()):e.msg&&(this.modifyPolicyDialog.hide(),this.notification.text=u.relieve(e.msg),this.notification.show(),this.refresh())})).catch((e=>{console.log(e),e&&e.message&&(this.modifyPolicyDialog.hide(),this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}catch(e){this.notification.text=e.message,this.notification.show()}}_deleteResourcePolicy(){const e=this.current_policy_name;globalThis.backendaiclient.resourcePolicy.delete(e).then((({delete_keypair_resource_policy:e})=>{e.ok?(this.deletePolicyDialog.hide(),this.notification.text=p("resourcePolicy.SuccessfullyDeleted"),this.notification.show(),this.refresh()):e.msg&&(this.deletePolicyDialog.hide(),this.notification.text=u.relieve(e.msg),this.notification.show(),this.refresh())})).catch((e=>{console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}_toggleCheckbox(e){var t;const i=e.target,s=i.checked,o=i.closest("div").querySelector("mwc-textfield");o.disabled=s,o.disabled||""===o.value&&(o.value=null!==(t=o.min)&&void 0!==t?t:0)}_validateResourceInput(e){const t=e.target.closest("mwc-textfield"),i=t.closest("div").querySelector("wl-label.unlimited"),s=i?i.querySelector("wl-checkbox"):null;if(t.classList.contains("discrete")&&(t.value=Math.round(t.value)),t.value<=0&&(t.value="concurrency-limit"===t.id||"container-per-session-limit"===t.id?1:0),!t.valid){const e=t.step?(o=t.step)%1?o.toString().split(".")[1].length:0:0;t.value=e>0?Math.min(t.value,t.value<0?t.min:t.max).toFixed(e):Math.min(Math.round(t.value),t.value<0?t.min:t.max)}var o;s&&(t.disabled=s.checked=t.value==parseFloat(t.min))}_updateUnlimitedValue(e){return["-",0,"0","Unlimited",1/0,"Infinity",$.getValue()].includes(e)?"":e}_validateUserInput(e){if(e.disabled)e.value="";else if(""===e.value)throw new Error(p("resourcePolicy.CannotCreateResourcePolicy"))}_updateInputStatus(e){const t=e,i=t.closest("div").querySelector("wl-checkbox");""===t.value||0===t.value||["concurrency-limit","container-per-session-limit"].includes(t.id)&&t.value===$.getValue()?(t.disabled=!0,i.checked=!0):(t.disabled=!1,i.checked=!1)}_markIfUnlimited(e,t=!1){return["-",0,"0","Unlimited",1/0,"Infinity"].includes(e)?"∞":["NaN",NaN].includes(e)?"-":t?k.bytesToGB(e,1):e}_getAllStorageHostsInfo(){return globalThis.backendaiclient.vfolder.list_all_hosts().then((e=>{this.all_vfolder_hosts=e.allowed})).catch((e=>{throw e}))}};e([t({type:Boolean})],I.prototype,"visible",void 0),e([t({type:String})],I.prototype,"listCondition",void 0),e([t({type:Object})],I.prototype,"keypairs",void 0),e([t({type:Array})],I.prototype,"resourcePolicy",void 0),e([t({type:Object})],I.prototype,"keypairInfo",void 0),e([t({type:Boolean,reflect:!0})],I.prototype,"active",void 0),e([t({type:String})],I.prototype,"condition",void 0),e([t({type:Array})],I.prototype,"resource_policy_names",void 0),e([t({type:String})],I.prototype,"current_policy_name",void 0),e([t({type:Number})],I.prototype,"selectAreaHeight",void 0),e([t({type:Boolean})],I.prototype,"enableSessionLifetime",void 0),e([t({type:Boolean})],I.prototype,"enableParsingStoragePermissions",void 0),e([t({type:Object})],I.prototype,"_boundResourceRenderer",void 0),e([t({type:Object})],I.prototype,"_boundConcurrencyRenderer",void 0),e([t({type:Object})],I.prototype,"_boundControlRenderer",void 0),e([t({type:Object})],I.prototype,"_boundPolicyNameRenderer",void 0),e([t({type:Object})],I.prototype,"_boundClusterSizeRenderer",void 0),e([t({type:Object})],I.prototype,"_boundStorageNodesRenderer",void 0),e([i("#dropdown-area")],I.prototype,"dropdownArea",void 0),e([i("#vfolder-count-limit")],I.prototype,"vfolderCountLimitInput",void 0),e([i("#vfolder-capacity-limit")],I.prototype,"vfolderCapacityLimit",void 0),e([i("#cpu-resource")],I.prototype,"cpuResource",void 0),e([i("#ram-resource")],I.prototype,"ramResource",void 0),e([i("#gpu-resource")],I.prototype,"gpuResource",void 0),e([i("#fgpu-resource")],I.prototype,"fgpuResource",void 0),e([i("#concurrency-limit")],I.prototype,"concurrencyLimit",void 0),e([i("#idle-timeout")],I.prototype,"idleTimeout",void 0),e([i("#container-per-session-limit")],I.prototype,"containerPerSessionLimit",void 0),e([i("#session-lifetime")],I.prototype,"sessionLifetime",void 0),e([i("#delete-policy-dialog")],I.prototype,"deletePolicyDialog",void 0),e([i("#modify-policy-dialog")],I.prototype,"modifyPolicyDialog",void 0),e([i("#allowed-vfolder-hosts")],I.prototype,"allowedVfolderHostsSelect",void 0),e([i("#id_new_policy_name")],I.prototype,"newPolicyName",void 0),e([i("#list-status")],I.prototype,"_listStatus",void 0),e([g()],I.prototype,"all_vfolder_hosts",void 0),e([g()],I.prototype,"allowed_vfolder_hosts",void 0),e([g()],I.prototype,"is_super_admin",void 0),e([g()],I.prototype,"vfolderPermissions",void 0),I=k=e([s("backend-ai-resource-policy-list")],I);let P=class extends o{constructor(){super(),this.isAdmin=!1,this.editMode=!1,this.users=[],this.userInfo=Object(),this.userInfoGroups=[],this.condition="",this._boundControlRenderer=this.controlRenderer.bind(this),this._userIdRenderer=this.userIdRenderer.bind(this),this._userNameRenderer=this.userNameRenderer.bind(this),this._userStatusRenderer=this.userStatusRenderer.bind(this),this._totpActivatedRenderer=this.totpActivatedRenderer.bind(this),this.signoutUserName="",this.notification=Object(),this.listCondition="loading",this._totalUserCount=0,this.isUserInfoMaskEnabled=!1,this.totpSupported=!1,this.totpActivated=!1,this.totpKey="",this.totpUri="",this.userStatus={active:"Active",inactive:"Inactive","before-verification":"Before Verification",deleted:"Deleted"}}static get styles(){return[a,l,r,n,c,d`
        vaadin-grid {
          border: 0;
          font-size: 14px;
          height: calc(100vh - 229px);
        }

        backend-ai-dialog h4,
        backend-ai-dialog wl-label {
          font-size: 14px;
          padding: 5px 15px 5px 12px;
          margin: 0 0 10px 0;
          display: block;
          height: 20px;
          border-bottom: 1px solid #DDD;
        }

        wl-label {
          font-family: Roboto;
        }

        wl-switch {
          margin-right: 15px;
        }

        vaadin-item {
          font-size: 13px;
          font-weight: 100;
        }

        div.indicator,
        span.indicator {
          font-size: 9px;
          margin-right: 5px;
        }

        div.configuration {
          width: 70px !important;
        }

        div.password-area {
          width: 100%;
          max-width: 322px;
        }

        backend-ai-dialog wl-textfield,
        backend-ai-dialog wl-textarea {
          padding-left: 15px;
          --input-font-family: var(--general-font-family);
          --input-color-disabled: #222;
          --input-label-color-disabled: #222;
          --input-label-font-size: 12px;
          --input-border-style-disabled: 1px solid #ccc;
        }

        backend-ai-dialog li {
          font-family: var(--general-font-family);
          font-size: 16px;
        }

        wl-textfield:not([disabled]),
        wl-textarea:not([disabled]) {
          margin-bottom: 15px;
          width: 280px;
        }

        wl-button {
          --button-bg: var(--paper-light-green-50);
          --button-bg-hover: var(--paper-green-100);
          --button-bg-active: var(--paper-green-600);
          color: var(--paper-green-900);
        }

        mwc-button, mwc-button[unelevated], mwc-button[outlined] {
          background-image: none;
          --mdc-theme-primary: var(--general-button-background-color);
          --mdc-theme-on-primary: var(--general-button-color);
          --mdc-typography-font-family: var(--general-font-family);
        }

        mwc-select.full-width {
          width: 100%;
          /* Need to be set when fixedMenuPosition attribute is enabled */
          --mdc-menu-max-width: 330px;
          --mdc-menu-min-width: 330px;
        }

        mwc-textfield, mwc-textarea {
          width: 100%;
          --mdc-typography-font-family: var(--general-font-family);
          --mdc-typography-textfield-font-size: 14px;
          --mdc-typography-textarea-font-size: 14px;
          --mdc-text-field-fill-color: transparent;
          --mdc-theme-primary: var(--general-textfield-selected-color);
        }

        p.label {
          font-size: 16px;
          font-family: var(--general-font-family);
          color: var(--general-sidebar-color);
          width: 270px;
        }

        mwc-icon.totp {
          --mdc-icon-size: 24px;
        }
      `]}firstUpdated(){this.notification=globalThis.lablupNotification,this.addEventListener("user-list-updated",(()=>{this.refresh()}))}async _viewStateChanged(e){var t,i;await this.updateComplete,!1!==e&&(void 0===globalThis.backendaiclient||null===globalThis.backendaiclient||!1===globalThis.backendaiclient.ready?document.addEventListener("backend-ai-connected",(async()=>{var e,t;this.totpSupported=(null===(e=globalThis.backendaiclient)||void 0===e?void 0:e.supports("2FA"))&&await(null===(t=globalThis.backendaiclient)||void 0===t?void 0:t.isManagerSupportingTOTP()),this._refreshUserData(),this.isAdmin=globalThis.backendaiclient.is_admin,this.isUserInfoMaskEnabled=globalThis.backendaiclient._config.maskUserInfo}),!0):(this.totpSupported=(null===(t=globalThis.backendaiclient)||void 0===t?void 0:t.supports("2FA"))&&await(null===(i=globalThis.backendaiclient)||void 0===i?void 0:i.isManagerSupportingTOTP()),this._refreshUserData(),this.isAdmin=globalThis.backendaiclient.is_admin,this.isUserInfoMaskEnabled=globalThis.backendaiclient._config.maskUserInfo))}_refreshUserData(){var e;let t=!0;if("active"===this.condition)t=!0;else t=!1;this.listCondition="loading",null===(e=this._listStatus)||void 0===e||e.show();const i=["email","username","need_password_change","full_name","description","is_active","domain_name","role","groups {id name}","status"];return this.totpSupported&&i.push("totp_activated"),globalThis.backendaiclient.user.list(t,i).then((e=>{var t;const i=e.users;this.users=i,0==this.users.length?this.listCondition="no-data":null===(t=this._listStatus)||void 0===t||t.hide()})).catch((e=>{var t;null===(t=this._listStatus)||void 0===t||t.hide(),console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}async _editUserDetail(e){return this.editMode=!0,this._showUserDetailDialog(e)}async _showUserDetail(e){return this.editMode=!1,this._showUserDetailDialog(e)}async _showUserDetailDialog(e){const t=e.target.closest("#controls")["user-id"];let i;try{const e=await this._getUserData(t);this.userInfo=e.user,i=this.userInfo.groups.map((e=>e.name)),this.userInfoGroups=i,this.userInfoDialog.show()}catch(e){e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}}_signoutUserDialog(e){const t=e.target.closest("#controls")["user-id"];this.signoutUserName=t,this.signoutUserDialog.show()}_signoutUser(){globalThis.backendaiclient.user.delete(this.signoutUserName).then((e=>{this.notification.text=p("credential.SignoutSeccessfullyFinished"),this.notification.show(),this._refreshUserData(),this.signoutUserDialog.hide()})).catch((e=>{console.log(e),void 0!==e.message?(this.notification.text=u.relieve(e.title),this.notification.detail=e.message):this.notification.text=u.relieve("Signout failed. Check your permission and try again."),this.notification.show()}))}async _getUserData(e){const t=["email","username","need_password_change","full_name","description","status","domain_name","role","groups {id name}"];return this.totpSupported&&t.push("totp_activated"),globalThis.backendaiclient.user.get(e,t)}refresh(){this._refreshUserData(),this.userGrid.clearCache()}_isActive(){return"active"===this.condition}_elapsed(e,t){const i=new Date(e);let s;s=(this.condition,new Date);const o=Math.floor((s.getTime()-i.getTime())/1e3);return Math.floor(o/86400)}_humanReadableTime(e){return new Date(e).toUTCString()}_markIfUnlimited(e){return["-",0,"Unlimited",1/0,"Infinity"].includes(e)?"∞":e}_togglePasswordVisibility(e){const t=e.__on,i=e.closest("div").querySelector("mwc-textfield");t?i.setAttribute("type","text"):i.setAttribute("type","password")}_togglePasswordInputRequired(){const e=this.passwordInput.value,t=this.confirmInput.value;this.passwordInput.required=""===e&&""!==t,this.confirmInput.required=""!==e&&""===t,this.passwordInput.reportValidity(),this.confirmInput.reportValidity()}async _saveChanges(e){var t;const i=this.usernameInput.value,s=this.fullNameInput.value,o=this.passwordInput.value,a=this.confirmInput.value,l=this.descriptionInput.value,r=this.statusSelect.value,n=this.needPasswordChangeSwitch.selected;let c;if(this.totpSupported&&(c=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#totp_activated_change")),this._togglePasswordInputRequired(),!this.passwordInput.checkValidity()||!this.confirmInput.checkValidity())return;if(o!==a)return this.notification.text=p("environment.PasswordsDoNotMatch"),void this.notification.show();const d=Object();if(""!==o&&(d.password=o),i!==this.userInfo.username&&(d.username=i),s!==this.userInfo.full_name&&(d.full_name=s),l!==this.userInfo.description&&(d.description=l),n!==this.userInfo.need_password_change&&(d.need_password_change=n),r!==this.userInfo.status&&(d.status=r),0===Object.entries(d).length&&this.totpSupported&&c.selected===this.userInfo.totp_activated)return this._hideDialog(e),this.notification.text=p("environment.NoChangeMade"),void this.notification.show();const h=[];if(Object.entries(d).length>0){const e=await globalThis.backendaiclient.user.update(this.userInfo.email,d).then((e=>{e.modify_user.ok?(this.notification.text=p("environment.SuccessfullyModified"),this.userInfo={...this.userInfo,...d,password:null},this._refreshUserData(),this.passwordInput.value="",this.confirmInput.value=""):(this.notification.text=u.relieve(e.modify_user.msg),this.usernameInput.value=this.userInfo.username,this.descriptionInput.value=this.userInfo.description),this.notification.show()}));h.push(e)}if(this.totpSupported&&!c.selected&&c.selected!==this.userInfo.totp_activated){const e=await globalThis.backendaiclient.remove_totp(this.userInfo.email).then((()=>{this.notification.text=p("totp.TotpRemoved"),this.notification.show()}));h.push(e)}if(await Promise.all(h).then((()=>{this.userInfoDialog.hide(),this.refresh()})).catch((e=>{console.log(e),e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))})),this.userInfo.email===globalThis.backendaiclient.email){const e=new CustomEvent("current-user-info-changed",{detail:d});document.dispatchEvent(e)}}_getUserId(e=""){if(e&&this.isUserInfoMaskEnabled){const t=2,i=e.split("@")[0].length-t;e=globalThis.backendaiutils._maskString(e,"*",t,i)}return e}_getUsername(e=""){if(e&&this.isUserInfoMaskEnabled){const t=2,i=e.length-t;e=globalThis.backendaiutils._maskString(e,"*",t,i)}return e}async _toggleActivatingSwitch(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#totp_activated_change");!this.userInfo.totp_activated&&t.selected&&(this.userInfo.email!==globalThis.backendaiclient.email?(t.selected=!1,this.notification.text=p("credential.AdminCanOnlyRemoveTotp"),this.notification.show()):await this._openTotpSetupDialog())}async _openTotpSetupDialog(){var e;null===(e=this.totpSetupDialog)||void 0===e||e.show();const t=await globalThis.backendaiclient.initialize_totp();this.totpKey=t.totp_key,this.totpUri=t.totp_uri;const i=y.generatePNG(t.totp_uri,null);this.totpUriQrImage&&(this.totpUriQrImage.src=i)}_hideTotpSetupDialog(){var e;null===(e=this.totpSetupDialog)||void 0===e||e.hide()}async _setTotpActivated(){if(this.totpSupported){const e=await globalThis.backendaiclient.user.get(globalThis.backendaiclient.email,["totp_activated"]);this.totpActivated=e.user.totp_activated}}async _confirmOtpSetup(){var e;const t=null===(e=this.confirmOtpTextfield)||void 0===e?void 0:e.value;try{await globalThis.backendaiclient.activate_totp(t),this.notification.text=p("totp.TotpSetupCompleted"),this.notification.show(),await this._setTotpActivated(),this._hideTotpSetupDialog()}catch(e){this.notification.text=p("totp.InvalidTotpCode"),this.notification.show()}}_indexRenderer(e,t,i){const s=i.index+1;h(m`
        <div>${s}</div>
      `,e)}controlRenderer(e,t,i){h(m`
        <div
          id="controls"
          class="layout horizontal flex center"
          .user-id="${i.item.email}">
          <wl-button fab flat inverted
            class="fg green"
            icon="assignment"
            @click="${e=>this._showUserDetail(e)}">
            <wl-icon>assignment</wl-icon>
          </wl-button>
          <wl-button fab flat inverted
            class="fg blue"
            icon="settings"
            @click="${e=>this._editUserDetail(e)}">
            <wl-icon>settings</wl-icon>
          </wl-button>

          ${globalThis.backendaiclient.is_superadmin&&this._isActive()?m`
            <wl-button fab flat inverted class="fg red controls-running"
                               @click="${e=>this._signoutUserDialog(e)}">
                               <wl-icon>delete_forever</wl-icon>
            </wl-button>
          `:m``}
        </div>
      `,e)}userIdRenderer(e,t,i){h(m`
        <span>${this._getUserId(i.item.email)}</span>
      `,e)}userNameRenderer(e,t,i){h(m`
        <span>${this._getUsername(i.item.username)}</span>
      `,e)}userStatusRenderer(e,t,i){const s="active"===i.item.status?"green":"lightgrey";h(m`
        <lablup-shields app="" color="${s}" description="${i.item.status}" ui="flat"></lablup-shields>
      `,e)}totpActivatedRenderer(e,t,i){var s;h(m`
        <div class="layout horizontal center center-justified wrap">
          ${(null===(s=i.item)||void 0===s?void 0:s.totp_activated)?m`
            <mwc-icon class="fg green totp">check_circle</mwc-icon>
          `:m`
            <mwc-icon class="fg red totp">block</mwc-icon>
          `}
        </div>
      `,e)}render(){return m`
      <link rel="stylesheet" href="resources/custom.css">
      <lablup-loading-spinner id="loading-spinner"></lablup-loading-spinner>
      <div class="list-wrapper">
        <vaadin-grid theme="row-stripes column-borders compact"
                    aria-label="User list" id="user-grid" .items="${this.users}">
          <vaadin-grid-column width="40px" flex-grow="0" header="#" text-align="center"
                              .renderer="${this._indexRenderer.bind(this)}"></vaadin-grid-column>
          <lablup-grid-sort-filter-column auto-width path="email" header="${v("credential.UserID")}" resizable
                              .renderer="${this._userIdRenderer.bind(this)}"></lablup-grid-sort-filter-column>
          <lablup-grid-sort-filter-column auto-width path="username" header="${v("credential.Name")}" resizable
                              .renderer="${this._userNameRenderer}"></lablup-grid-sort-filter-column>
          ${this.totpSupported?m`
            <vaadin-grid-sort-column auto-width flex-grow="0" path="totp_activated" header="${v("webui.menu.TotpActivated")}" resizable
                              .renderer="${this._totpActivatedRenderer.bind(this)}"></vaadin-grid-sort-column>
          `:m``}
          ${"active"!==this.condition?m`
            <lablup-grid-sort-filter-column auto-width path="status" header="${v("credential.Status")}" resizable
                              .renderer="${this._userStatusRenderer}"></lablup-grid-sort-filter-column>`:m``}
          <vaadin-grid-column resizable header="${v("general.Control")}"
              .renderer="${this._boundControlRenderer}"></vaadin-grid-column>
        </vaadin-grid>
        <backend-ai-list-status id="list-status" statusCondition="${this.listCondition}" message="${p("credential.NoUserToDisplay")}"></backend-ai-list-status>
      </div>
      <backend-ai-dialog id="signout-user-dialog" fixed backdrop>
        <span slot="title">${v("dialog.title.LetsDouble-Check")}</span>
        <div slot="content">
          <p>You are inactivating the user <span style="color:red">${this.signoutUserName}</span>.</p>
          <p>${v("dialog.ask.DoYouWantToProceed")}</p>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout">
          <mwc-button
              label="${v("button.Cancel")}"
              @click="${e=>this._hideDialog(e)}"></mwc-button>
          <mwc-button
              unelevated
              label="${v("button.Okay")}"
              @click="${()=>this._signoutUser()}"></mwc-button>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="user-info-dialog" fixed backdrop narrowLayout>
        <div slot="title" class="horizontal center layout">
          <span style="margin-right:15px;">${v("credential.UserDetail")}</span>
          <lablup-shields app="" description="user" ui="flat"></lablup-shields>
        </div>
        <div slot="content" class="horizontal layout" style="overflow-x:hidden;">
          <div>
            <h4>${p("credential.Information")}</h4>
            <div role="listbox" class="center vertical layout">
              <mwc-textfield
                  disabled
                  label="${p("credential.UserID")}"
                  pattern="^[a-zA-Z0-9_-]+$"
                  value="${this.userInfo.email}"
                  maxLength="64"
                  helper="${p("maxLength.64chars")}"></mwc-textfield>
              <mwc-textfield
                  ?disabled=${!this.editMode}
                  label="${p("credential.UserName")}"
                  id="username"
                  value="${this.userInfo.username}"
                  maxLength="64"
                  helper="${p("maxLength.64chars")}"></mwc-textfield>
              <mwc-textfield
                  ?disabled=${!this.editMode}
                  label="${p("credential.FullName")}"
                  id="full_name"
                  value="${this.userInfo.full_name?this.userInfo.full_name:" "}"
                  maxLength="64"
                  helper="${p("maxLength.64chars")}"></mwc-textfield>
              ${this.editMode?m`
                <div class="horizontal layout password-area">
                  <mwc-textfield
                      type="password"
                      id="password"
                      autoValidate
                      validationMessage="${v("webui.menu.InvalidPasswordMessage")}"
                      pattern=${_.passwordRegex}
                      maxLength="64"
                      label="${p("general.NewPassword")}"
                      @change=${()=>this._togglePasswordInputRequired()}></mwc-textfield>
                  <mwc-icon-button-toggle off onIcon="visibility" offIcon="visibility_off"
                      @click="${e=>this._togglePasswordVisibility(e.target)}">
                  </mwc-icon-button-toggle>
                </div>
                <div class="horizontal layout password-area">
                  <mwc-textfield
                      type="password"
                      id="confirm"
                      autoValidate
                      validationMessage="${v("webui.menu.InvalidPasswordMessage")}"
                      pattern=${_.passwordRegex}
                      maxLength="64"
                      @change=${()=>this._togglePasswordInputRequired()}
                      label="${p("webui.menu.NewPasswordAgain")}"></mwc-textfield>
                  <mwc-icon-button-toggle off onIcon="visibility" offIcon="visibility_off"
                      @click="${e=>this._togglePasswordVisibility(e.target)}">
                  </mwc-icon-button-toggle>
                </div>
                <mwc-textarea
                    type="text"
                    id="description"
                    label="${p("credential.Description")}"
                    placeholder="${p("maxLength.500chars")}"
                    value="${this.userInfo.description}"
                    id="description"></mwc-textarea>`:m``}
              ${this.editMode?m`
                <mwc-select class="full-width" id="status" label="${p("credential.UserStatus")}" fixedMenuPosition>
                  ${Object.keys(this.userStatus).map((e=>m`
                    <mwc-list-item value="${e}" ?selected="${e===this.userInfo.status}">${this.userStatus[e]}</mwc-list-item>
                  `))}
                </mwc-select>
                <div class="horizontal layout center" style="margin:10px;">
                  <p class="label">${p("credential.DescRequirePasswordChange")}</p>
                  <mwc-switch
                      id="need_password_change"
                      ?selected=${this.userInfo.need_password_change}></mwc-switch>
                </div>
                ${this.totpSupported?m`
                  <div class="horizontal layout center">
                    <p class="label">${p("webui.menu.TotpActivated")}</p>
                    <mwc-switch
                        id="totp_activated_change"
                        ?selected=${this.userInfo.totp_activated}
                        @click="${()=>this._toggleActivatingSwitch()}"></mwc-switch>
                  </div>
                `:m``}
                `:m`
                <mwc-textfield
                    disabled
                    label="${p("credential.DescActiveUser")}"
                    value="${"active"===this.userInfo.status?`${p("button.Yes")}`:`${p("button.No")}`}"></mwc-textfield>
                <mwc-textfield
                    disabled
                    label="${p("credential.DescRequirePasswordChange")}"
                    value="${this.userInfo.need_password_change?`${p("button.Yes")}`:`${p("button.No")}`}"></mwc-textfield>
                ${this.totpSupported?m`
                  <mwc-textfield
                      disabled
                      label="${p("webui.menu.TotpActivated")}"
                      value="${this.userInfo.totp_activated?`${p("button.Yes")}`:`${p("button.No")}`}"></mwc-textfield>
                `:m``}
            `}
          </div>
        </div>
        ${this.editMode?m``:m`
          <div>
            <h4>${p("credential.Association")}</h4>
            <div role="listbox" style="margin: 0;">
              <wl-textfield
                label="${v("credential.Domain")}"
                disabled
                value="${this.userInfo.domain_name}">
              </wl-textfield>
              <wl-textfield
                label="${v("credential.Role")}"
                disabled
                value="${this.userInfo.role}">
              </wl-textfield>
            </div>
            <h4>${p("credential.ProjectAndGroup")}</h4>
            <div role="listbox" style="margin: 0;">
              <ul>
              ${this.userInfoGroups.map((e=>m`
                <li>${e}</li>
              `))}
              </ul>
            </div>
          </div>
        `}
        </div>
        <div slot="footer" class="horizontal center-justified flex layout distancing">
        ${this.editMode?m`
          <mwc-button
              unelevated
              fullwidth
              label="${v("button.SaveChanges")}"
              icon="check"
              @click=${e=>this._saveChanges(e)}></mwc-button>`:m``}
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="totp-setup-dialog" fixed backdrop>
        <span slot="title">${v("webui.menu.SetupTotp")}</span>
        <div slot="content" class="layout vertical" style="width: 300px; align-items: center;">
          <p>${v("totp.ScanQRToEnable")}</p>
          <img id="totp-uri-qrcode" style="width: 150px; height: 150px;" alt="QR" />
          <p>${v("totp.TypeInAuthKey")}</p>
          <blockquote>${this.totpKey}</blockquote>
        </div>
        <div slot="content" class="layout vertical" style="width: 300px">
          <p style="flex-grow: 1;">${v("totp.EnterConfirmationCode")}</p>
          <mwc-textfield id="totp-confirm-otp" type="number" no-label-float placeholder="000000"
            min="0" max="999999" style="margin-left:1em;width:120px;">
            </mwc-textfield>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout">
          <mwc-button unelevated @click="${()=>this._confirmOtpSetup()}">${v("button.Confirm")}</mwc-button>
        </div>
      </backend-ai-dialog>
    `}};var S;e([t({type:Boolean})],P.prototype,"isAdmin",void 0),e([t({type:Boolean})],P.prototype,"editMode",void 0),e([t({type:Array})],P.prototype,"users",void 0),e([t({type:Object})],P.prototype,"userInfo",void 0),e([t({type:Array})],P.prototype,"userInfoGroups",void 0),e([t({type:String})],P.prototype,"condition",void 0),e([t({type:Object})],P.prototype,"_boundControlRenderer",void 0),e([t({type:Object})],P.prototype,"_userIdRenderer",void 0),e([t({type:Object})],P.prototype,"_userNameRenderer",void 0),e([t({type:Object})],P.prototype,"_userStatusRenderer",void 0),e([t({type:Object})],P.prototype,"_totpActivatedRenderer",void 0),e([t({type:Object})],P.prototype,"keypairs",void 0),e([t({type:String})],P.prototype,"signoutUserName",void 0),e([t({type:Object})],P.prototype,"notification",void 0),e([t({type:String})],P.prototype,"listCondition",void 0),e([t({type:Number})],P.prototype,"_totalUserCount",void 0),e([t({type:Boolean})],P.prototype,"isUserInfoMaskEnabled",void 0),e([t({type:Boolean})],P.prototype,"totpSupported",void 0),e([t({type:Boolean})],P.prototype,"totpActivated",void 0),e([t({type:String})],P.prototype,"totpKey",void 0),e([t({type:String})],P.prototype,"totpUri",void 0),e([t({type:Object})],P.prototype,"userStatus",void 0),e([i("#user-grid")],P.prototype,"userGrid",void 0),e([i("#loading-spinner")],P.prototype,"spinner",void 0),e([i("#list-status")],P.prototype,"_listStatus",void 0),e([i("#password")],P.prototype,"passwordInput",void 0),e([i("#confirm")],P.prototype,"confirmInput",void 0),e([i("#username")],P.prototype,"usernameInput",void 0),e([i("#full_name")],P.prototype,"fullNameInput",void 0),e([i("#description")],P.prototype,"descriptionInput",void 0),e([i("#need_password_change")],P.prototype,"needPasswordChangeSwitch",void 0),e([i("#status")],P.prototype,"statusSelect",void 0),e([i("#signout-user-dialog")],P.prototype,"signoutUserDialog",void 0),e([i("#user-info-dialog")],P.prototype,"userInfoDialog",void 0),e([i("#totp-setup-dialog")],P.prototype,"totpSetupDialog",void 0),e([i("#totp-confirm-otp")],P.prototype,"confirmOtpTextfield",void 0),e([i("#totp-uri-qrcode")],P.prototype,"totpUriQrImage",void 0),P=e([s("backend-ai-user-list")],P);let R=S=class extends o{constructor(){super(),this.concurrency_limit={},this.idle_timeout={},this.session_lifetime={},this.vfolder_capacity={},this.vfolder_max_limit={},this.container_per_session_limit={},this.rate_metric=[1e3,2e3,3e3,4e3,5e3,1e4,5e4],this.resource_policies=Object(),this.isAdmin=!1,this.isSuperAdmin=!1,this._status="inactive",this.new_access_key="",this.new_secret_key="",this._activeTab="users",this.notification=Object(),this._defaultFileName="",this.enableSessionLifetime=!1,this.enableParsingStoragePermissions=!1,this.default_vfolder_host="",this.all_vfolder_hosts=[],this.resource_policy_names=[]}static get styles(){return[a,l,r,n,c,d`
        #new-keypair-dialog {
          min-width: 350px;
          height: 100%;
        }

        div.card > h4 {
          margin-bottom: 0px;
        }

        div.card h3 {
          padding-top: 0;
          padding-right: 15px;
          padding-bottom: 0;
        }

        div.card div.card {
          margin: 0;
          padding: 0;
          --card-elevation: 0;
        }

        div.sessions-section {
          width: 167px;
          margin-bottom: 10px;
        }

        wl-tab-group {
          border-radius: 5px 5px 0 0;
          --tab-group-indicator-bg: var(--general-tabbar-button-color);
        }

        wl-tab {
          border-radius: 5px 5px 0 0;
          --tab-color: var(--general-sidepanel-color);
          --tab-color-hover: #26272a;
          --tab-color-hover-filled: var(--general-tabbar-button-color);
          --tab-color-active:var(--general-tabbar-button-color);
          --tab-color-active-hover: var(--general-tabbar-button-color);
          --tab-color-active-filled: var(--general-tabbar-button-color);
          --tab-bg-active: #535457;
          --tab-bg-filled: #26272a;
          --tab-bg-active-hover: #535457;
        }

        h3.tab {
          background-color: var(--general-tabbar-background-color);
          border-radius: 5px 5px 0 0;
          margin: 0 auto;
        }

        mwc-tab-bar {
          --mdc-theme-primary: var(--general-sidebar-selected-color);
          --mdc-text-transform: none;
          --mdc-tab-color-default: var(--general-tabbar-background-color);
          --mdc-tab-text-label-color-default: var(--general-tabbar-tab-disabled-color);
        }


        mwc-list-item {
          height: auto;
          font-size: 12px;
          --mdc-theme-primary: var(--general-sidebar-color);
        }

        wl-expansion {
          --expansion-elevation: 0;
          --expansion-elevation-open: 0;
          --expansion-elevation-hover: 0;
          --expansion-margin-open: 0;
          --expansion-content-padding: 0;
        }

        wl-expansion {
          font-weight: 200;
        }

        wl-label {
          width: 100%;
          min-width: 60px;
          font-size: 10px; // 11px;
          --label-font-family: 'Ubuntu', Roboto;
        }

        wl-label.folders {
          margin: 3px 0px 7px 0px;
        }

        wl-label.unlimited {
          margin: 4px 0px 0px 0px;
        }

        wl-label.unlimited > wl-checkbox {
          border-width: 1px;
        }

        wl-list-item {
          width: 100%;
        }

        wl-checkbox {
          --checkbox-size: 10px;
          --checkbox-border-radius: 2px;
          --checkbox-bg-checked: var(--general-checkbox-color);
          --checkbox-checkmark-stroke-color: white;
          --checkbox-color-checked: white;
        }

        mwc-textfield {
          width: 100%;
          --mdc-text-field-fill-color: transparent;
          --mdc-theme-primary: var(--general-textfield-selected-color);
          --mdc-typography-font-family: var(--general-font-family);
        }

        mwc-textfield.resource-input {
          width: 5rem;
        }

        mwc-textfield#export-file-name {
          margin-bottom: 10px;
        }

        mwc-textfield#id_user_name {
          margin-bottom: 18px;
        }

        mwc-menu {
          --mdc-theme-surface: #f1f1f1;
          --mdc-menu-item-height : auto;
        }

        mwc-menu#dropdown-menu {
          position: relative;
          left: -10px;
          top: 50px;
        }

        mwc-list-item {
          font-size : 14px;
        }

        mwc-icon-button {
          --mdc-icon-size: 20px;
          color: var(--paper-grey-700);
        }

        mwc-icon-button#dropdown-menu-button {
          margin-left: 10px;
        }

        backend-ai-dialog {
          --component-min-width: 350px;
          --component-max-width: 390px;
        }

        backend-ai-dialog h4 {
          font-size: 14px;
          padding: 5px 15px 5px 12px;
          margin: 0 0 10px 0;
          display: block;
          height: 20px;
          border-bottom: 1px solid #DDD;
        }

        div.popup-right-margin {
          margin-right: 5px;
        }
        div.popup-left-margin {
          margin-left: 5px;
        }
        div.popup-both-margin {
          margin-left: 5px;
          margin-right: 5px;
        }

        @media screen and (max-width: 805px) {
          mwc-tab, mwc-button {
            --mdc-typography-button-font-size: 10px;
          }

          wl-tab {
            width: 5px;
          }
        }
      `]}firstUpdated(){var e;this.notification=globalThis.lablupNotification,document.addEventListener("backend-ai-credential-refresh",(()=>{this.activeCredentialList.refresh(),this.inactiveCredentialList.refresh()}),!0),null===(e=this.shadowRoot)||void 0===e||e.querySelectorAll("wl-expansion").forEach((e=>{e.addEventListener("keydown",(e=>{e.stopPropagation()}),!0)})),this._addInputValidator(this.userIdInput),this.selectAreaHeight=this.dropdownArea.offsetHeight?this.dropdownArea.offsetHeight:"123px"}async _preparePage(){!0!==globalThis.backendaiclient.is_admin?this.disablePage():(this.isAdmin=!0,!0===globalThis.backendaiclient.is_superadmin&&(this.isSuperAdmin=!0)),this._activeTab="user-lists",this._addValidatorToPolicyInput(),this._getResourceInfo(),this._getResourcePolicies(),this._updateInputStatus(this.cpu_resource),this._updateInputStatus(this.ram_resource),this._updateInputStatus(this.gpu_resource),this._updateInputStatus(this.fgpu_resource),this._updateInputStatus(this.concurrency_limit),this._updateInputStatus(this.idle_timeout),this._updateInputStatus(this.container_per_session_limit),this._updateInputStatus(this.vfolder_capacity),this.enableSessionLifetime&&this._updateInputStatus(this.session_lifetime),this.vfolder_max_limit.value=10,this._defaultFileName=this._getDefaultCSVFileName(),await this._runAction()}async _viewStateChanged(e){if(await this.updateComplete,!1===e)return this.resourcePolicyList.active=!1,this.activeUserList.active=!1,void(this._status="inactive");this.resourcePolicyList.active=!0,this.activeUserList.active=!0,this._status="active",void 0===globalThis.backendaiclient||null===globalThis.backendaiclient||!1===globalThis.backendaiclient.ready?document.addEventListener("backend-ai-connected",(()=>{this.enableSessionLifetime=globalThis.backendaiclient.supports("session-lifetime"),this.enableParsingStoragePermissions=globalThis.backendaiclient.supports("fine-grained-storage-permissions"),this._preparePage(),this.enableParsingStoragePermissions&&this._getVfolderPermissions()})):(this.enableSessionLifetime=globalThis.backendaiclient.supports("session-lifetime"),this.enableParsingStoragePermissions=globalThis.backendaiclient.supports("fine-grained-storage-permissions"),this._preparePage(),this.enableParsingStoragePermissions&&this._getVfolderPermissions())}_getVfolderPermissions(){globalThis.backendaiclient.storageproxy.getAllPermissions().then((e=>{this.vfolderPermissions=e.vfolder_host_permission_list}))}_parseSelectedAllowedVfolderHostWithPermissions(e){const t={};return e.forEach((e=>{Object.assign(t,{[e]:this.vfolderPermissions})})),t}async _launchKeyPairDialog(){await this._getResourcePolicies(),this.newKeypairDialog.show(),this.userIdInput.value=""}_getAllStorageHostsInfo(){return globalThis.backendaiclient.vfolder.list_all_hosts().then((e=>{this.all_vfolder_hosts=e.allowed,this.default_vfolder_host=e.default})).catch((e=>{throw e}))}_launchResourcePolicyDialog(){Promise.allSettled([this._getAllStorageHostsInfo(),this._getResourcePolicies()]).then((e=>{this.newPolicyNameInput.mdcFoundation.setValid(!0),this.newPolicyNameInput.isUiValid=!0,this.newPolicyNameInput.value="",this.allowedVfolderHostsSelect.items=this.all_vfolder_hosts,this.allowedVfolderHostsSelect.selectedItemList=[this.default_vfolder_host],this.newPolicyDialog.show()})).catch((e=>{e&&e.message&&(this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}_launchUserAddDialog(){this.newUserDialog.show()}async _getResourcePolicies(){const e=["name","default_for_unspecified","total_resource_slots","max_concurrent_sessions","max_containers_per_session"];return this.enableSessionLifetime&&e.push("max_session_lifetime"),globalThis.backendaiclient.resourcePolicy.get(null,e).then((e=>{const t=globalThis.backendaiclient.utils.gqlToObject(e.keypair_resource_policies,"name"),i=globalThis.backendaiclient.utils.gqlToList(e.keypair_resource_policies,"name");this.resource_policies=t,this.resource_policy_names=i,this.resourcePolicy.layout(!0).then((()=>{this.resourcePolicy.select(0)})),this.rateLimit.layout(!0).then((()=>{this.rateLimit.select(0)}))}))}_addKeyPair(){let e="";if(!this.userIdInput.checkValidity())return;e=this.userIdInput.value;const t=this.resourcePolicy.value,i=this.rateLimit.value;globalThis.backendaiclient.keypair.add(e,!0,!1,t,i).then((e=>{if(e.create_keypair.ok)this.newKeypairDialog.hide(),this.notification.text=p("credential.KeypairCreated"),this.notification.show(),this.activeCredentialList.refresh();else if(e.create_keypair.msg){const t=e.create_keypair.msg.split(":")[1];this.notification.text=p("credential.UserNotFound")+t,this.notification.show()}else this.notification.text=p("dialog.ErrorOccurred"),this.notification.show()})).catch((e=>{console.log(e),e&&e.message&&(this.newKeypairDialog.hide(),this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}_readResourcePolicyInput(){const e={};let t;t=this.enableParsingStoragePermissions?JSON.stringify(this._parseSelectedAllowedVfolderHostWithPermissions(this.allowedVfolderHostsSelect.selectedItemList)):this.allowedVfolderHostsSelect.selectedItemList,this._validateUserInput(this.cpu_resource),this._validateUserInput(this.ram_resource),this._validateUserInput(this.gpu_resource),this._validateUserInput(this.fgpu_resource),this._validateUserInput(this.concurrency_limit),this._validateUserInput(this.idle_timeout),this._validateUserInput(this.container_per_session_limit),this._validateUserInput(this.vfolder_capacity),this._validateUserInput(this.vfolder_max_limit),e.cpu=this.cpu_resource.value,e.mem=this.ram_resource.value+"g",e["cuda.device"]=parseInt(this.gpu_resource.value),e["cuda.shares"]=parseFloat(this.fgpu_resource.value),this.concurrency_limit.value=""===this.concurrency_limit.value?0:parseInt(this.concurrency_limit.value),this.idle_timeout.value=""===this.idle_timeout.value?0:parseInt(this.idle_timeout.value),this.container_per_session_limit.value=""===this.container_per_session_limit.value?0:parseInt(this.container_per_session_limit.value),this.vfolder_capacity.value=""===this.vfolder_capacity.value?0:parseFloat(this.vfolder_capacity.value),this.vfolder_max_limit.value=""===this.vfolder_max_limit.value?0:parseInt(this.vfolder_max_limit.value),Object.keys(e).map((t=>{isNaN(parseFloat(e[t]))&&delete e[t]}));const i={default_for_unspecified:"UNLIMITED",total_resource_slots:JSON.stringify(e),max_concurrent_sessions:this.concurrency_limit.value,max_containers_per_session:this.container_per_session_limit.value,idle_timeout:this.idle_timeout.value,max_vfolder_count:this.vfolder_max_limit.value,max_vfolder_size:S.gBToBytes(this.vfolder_capacity.value),allowed_vfolder_hosts:t};return this.enableSessionLifetime&&(this._validateUserInput(this.session_lifetime),this.session_lifetime.value=""===this.session_lifetime.value?0:parseInt(this.session_lifetime.value),i.max_session_lifetime=this.session_lifetime.value),i}_addResourcePolicy(){if(this.newPolicyNameInput.checkValidity())try{this.newPolicyNameInput.checkValidity();const e=this.newPolicyNameInput.value;if(""===e)throw new Error(p("resourcePolicy.PolicyNameEmpty"));const t=this._readResourcePolicyInput();globalThis.backendaiclient.resourcePolicy.add(e,t).then((e=>{this.newPolicyDialog.hide(),this.notification.text=p("resourcePolicy.SuccessfullyCreated"),this.notification.show(),this.resourcePolicyList.refresh()})).catch((e=>{console.log(e),e&&e.message&&(this.newPolicyDialog.hide(),this.notification.text=u.relieve(e.title),this.notification.detail=e.message,this.notification.show(!0,e))}))}catch(e){this.notification.text=e.message,this.notification.show()}else this.newPolicyNameInput.reportValidity()}_addUser(){const e=this.userEmailInput.value,t=""!==this.userNameInput.value?this.userNameInput.value:e.split("@")[0],i=this.userPasswordInput.value;if(!this.userEmailInput.checkValidity()||!this.userPasswordInput.checkValidity()||!this.userPasswordConfirmInput.checkValidity())return;const s={username:t,password:i,need_password_change:!1,full_name:t,description:`${t}'s Account`,is_active:!0,domain_name:"default",role:"user"};globalThis.backendaiclient.group.list().then((t=>{const i=t.groups.find((e=>"default"===e.name)).id;return Promise.resolve(globalThis.backendaiclient.user.create(e,{...s,group_ids:[i]}))})).then((e=>{this.newUserDialog.hide(),e.create_user.ok?(this.notification.text=p("credential.UserAccountCreated"),this.activeUserList.refresh()):this.notification.text=p("credential.UserAccountCreatedError"),this.notification.show(),this.userEmailInput.value="",this.userNameInput.value="",this.userPasswordInput.value="",this.userPasswordConfirmInput.value=""}))}disablePage(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll(".admin");for(let e=0;e<t.length;e++)t[e].style.display="none"}_showTab(e){var t,i,s;const o=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll(".tab-content");for(let e=0;e<o.length;e++)o[e].style.display="none";let a,l;switch(this._activeTab=e.title,(null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#"+e.title)).style.display="block",this._activeTab){case"user-lists":case"credential-lists":a=this._activeTab.substring(0,this._activeTab.length-1),l=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector("wl-tab[value=active-"+a+"]"),l.checked=!0,this._showList(l)}}_showList(e){var t,i,s,o;const a=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll(".list-content");for(let e=0;e<a.length;e++)a[e].style.display="none";(null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#"+e.value)).style.display="block";const l=new CustomEvent("user-list-updated",{});null===(o=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector("#"+e.value))||void 0===o||o.dispatchEvent(l)}_toggleCheckbox(e){const t=e.target,i=t.checked,s=t.closest("div").querySelector("mwc-textfield");s.disabled=i,s.disabled||""===s.value&&(s.value=0)}_validateResourceInput(e){const t=e.target.closest("mwc-textfield"),i=t.closest("div").querySelector("wl-label.unlimited"),s=i?i.querySelector("wl-checkbox"):null;if(t.classList.contains("discrete")&&(t.value=Math.round(t.value)),t.value<=0&&(t.value="concurrency-limit"===t.id||"container-per-session-limit"===t.id?1:0),!t.valid){const e=t.step?(o=t.step)%1?o.toString().split(".")[1].length:0:0;t.value=e>0?Math.min(t.value,t.value<0?t.min:t.max).toFixed(e):Math.min(Math.round(t.value),t.value<0?t.min:t.max)}var o;s&&(t.disabled=s.checked=t.value==parseFloat(t.min))}_updateUnlimitedValue(e){return["-",0,"0","Unlimited",1/0,"Infinity"].includes(e)?"":e}_validateUserInput(e){if(e.disabled)e.value="";else if(""===e.value)throw new Error(p("resourcePolicy.CannotCreateResourcePolicy"))}_addValidatorToPolicyInput(){this.newPolicyNameInput.validityTransform=(e,t)=>{if(!t)return this.newPolicyNameInput.validationMessage=p("credential.validation.PolicyName"),{valid:!1,valueMissing:!0};if(t.valid){const t=!this.resource_policy_names.includes(e);return t||(this.newPolicyNameInput.validationMessage=p("credential.validation.NameAlreadyExists")),{valid:t,customError:!t}}return t.patternMismatch?(this.newPolicyNameInput.validationMessage=p("credential.validation.LetterNumber-_dot"),{valid:t.valid,patternMismatch:!t.valid}):t.valueMissing?(this.newPolicyNameInput.validationMessage=p("credential.validation.PolicyName"),{valid:t.valid,valueMissing:!t.valid}):(this.newPolicyNameInput.validationMessage=p("credential.validation.LetterNumber-_dot"),{valid:t.valid,patternMismatch:!t.valid})}}_updateInputStatus(e){const t=e,i=t.closest("div").querySelector("wl-checkbox");""===t.value||"0"===t.value?(t.disabled=!0,i.checked=!0):(t.disabled=!1,i.checked=!1)}_openExportToCsvDialog(){this._defaultFileName=this._getDefaultCSVFileName(),this.exportToCsvDialog.show()}_exportToCSV(){if(!this.exportFileNameInput.validity.valid)return;let e,t,i,s,o;switch(this._activeTab){case"user-lists":e=this.activeUserList.users,e.map((e=>{["password","need_password_change"].forEach((t=>delete e[t]))})),b.exportToCsv(this.exportFileNameInput.value,e);break;case"credential-lists":t=this.activeCredentialList.keypairs,i=this.inactiveCredentialList.keypairs,s=t.concat(i),s.map((e=>{["is_admin"].forEach((t=>delete e[t]))})),b.exportToCsv(this.exportFileNameInput.value,s);break;case"resource-policy-lists":o=this.resourcePolicyList.resourcePolicy,b.exportToCsv(this.exportFileNameInput.value,o)}this.notification.text=p("session.DownloadingCSVFile"),this.notification.show(),this.exportToCsvDialog.hide()}_getResourceInfo(){var e,t,i,s,o,a,l,r,n,c;this.cpu_resource=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#cpu-resource"),this.ram_resource=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#ram-resource"),this.gpu_resource=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector("#gpu-resource"),this.fgpu_resource=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelector("#fgpu-resource"),this.concurrency_limit=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelector("#concurrency-limit"),this.idle_timeout=null===(a=this.shadowRoot)||void 0===a?void 0:a.querySelector("#idle-timeout"),this.container_per_session_limit=null===(l=this.shadowRoot)||void 0===l?void 0:l.querySelector("#container-per-session-limit"),this.vfolder_capacity=null===(r=this.shadowRoot)||void 0===r?void 0:r.querySelector("#vfolder-capacity-limit"),this.vfolder_max_limit=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector("#vfolder-count-limit"),this.enableSessionLifetime&&(this.session_lifetime=null===(c=this.shadowRoot)||void 0===c?void 0:c.querySelector("#session-lifetime"))}_getDefaultCSVFileName(){return(new Date).toISOString().substring(0,10)+"_"+(new Date).toTimeString().slice(0,8).replace(/:/gi,"-")}_toggleDropdown(e){var t;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#dropdown-menu"),s=e.target;i.anchor=s,i.open||i.show()}_validatePassword1(){this.userPasswordConfirmInput.reportValidity(),this.userPasswordInput.validityTransform=(e,t)=>t.valid?{valid:t.valid,customError:!t.valid}:t.valueMissing?(this.userPasswordInput.validationMessage=p("signup.PasswordInputRequired"),{valid:t.valid,customError:!t.valid}):(this.userPasswordInput.validationMessage=p("signup.PasswordInvalid"),{valid:t.valid,customError:!t.valid})}_validatePassword2(){this.userPasswordConfirmInput.validityTransform=(e,t)=>{if(t.valid){const e=this.userPasswordInput.value===this.userPasswordConfirmInput.value;return e||(this.userPasswordConfirmInput.validationMessage=p("signup.PasswordNotMatched")),{valid:e,customError:!e}}return t.valueMissing?(this.userPasswordConfirmInput.validationMessage=p("signup.PasswordInputRequired"),{valid:t.valid,customError:!t.valid}):(this.userPasswordConfirmInput.validationMessage=p("signup.PasswordInvalid"),{valid:t.valid,customError:!t.valid})}}_validatePassword(){this._validatePassword1(),this._validatePassword2()}_togglePasswordVisibility(e){const t=e.__on,i=e.closest("div").querySelector("mwc-textfield");t?i.setAttribute("type","text"):i.setAttribute("type","password")}static gBToBytes(e=0){const t=Math.pow(10,9);return Math.round(t*e)}async _runAction(){if(/action=(add)$/.test(location.search)){if("add"===location.search.split("action=")[1])await this._launchKeyPairDialog()}}render(){return m`
      <link rel="stylesheet" href="resources/custom.css">
      <lablup-activity-panel noheader narrow autowidth>
        <div slot="message">
          <h3 class="tab horizontal wrap layout">
           <mwc-tab-bar>
            <mwc-tab title="user-lists" label="${v("credential.Users")}"
                @click="${e=>this._showTab(e.target)}"></mwc-tab>
            <mwc-tab title="credential-lists" label="${v("credential.Credentials")}"
                @click="${e=>this._showTab(e.target)}"></mwc-tab>
            <mwc-tab title="resource-policy-lists" label="${v("credential.ResourcePolicies")}"
                @click="${e=>this._showTab(e.target)}"></mwc-tab>
           </mwc-tab-bar>
            ${this.isAdmin?m`
                <span class="flex"></span>
                <div style="position: relative;">
                  <mwc-icon-button id="dropdown-menu-button" icon="more_horiz" raised
                                  @click="${e=>this._toggleDropdown(e)}"></mwc-icon-button>
                  <mwc-menu id="dropdown-menu">
                      <mwc-list-item>
                        <a class="horizontal layout start center" @click="${this._openExportToCsvDialog}">
                          <mwc-icon style="color:#242424;padding-right:10px;">get_app</mwc-icon>
                          ${v("credential.exportCSV")}
                        </a>
                      </mwc-list-item>
                    </mwc-menu>
                </div>
              `:m``}
          </h3>
          <div id="user-lists" class="admin item tab-content card">
            <h4 class="horizontal flex center center-justified layout">
              <wl-tab-group style="margin-bottom:-8px;">
                <wl-tab value="active-user-list" checked @click="${e=>this._showList(e.target)}">${v("credential.Active")}</wl-tab>
                <wl-tab value="inactive-user-list" @click="${e=>this._showList(e.target)}">${v("credential.Inactive")}</wl-tab>
              </wl-tab-group>
              <span class="flex"></span>
              <mwc-button raised id="add-user" icon="add" label="${v("credential.CreateUser")}"
                  @click="${this._launchUserAddDialog}"></mwc-button>
            </h4>
            <div>
              <backend-ai-user-list class="list-content" id="active-user-list" condition="active" ?active="${"user-lists"===this._activeTab}"></backend-ai-user-list>
              <backend-ai-user-list class="list-content" id="inactive-user-list" style="display:none;" ?active="${"user-lists"===this._activeTab}"></backend-ai-user-list>
            </div>
          </div>
          <div id="credential-lists" class="item tab-content card" style="display:none;">
            <h4 class="horizontal flex center center-justified layout">
              <wl-tab-group style="margin-bottom:-8px;">
                <wl-tab value="active-credential-list" checked @click="${e=>this._showList(e.target)}">${v("credential.Active")}</wl-tab>
                <wl-tab value="inactive-credential-list" @click="${e=>this._showList(e.target)}">${v("credential.Inactive")}</wl-tab>
              </wl-tab-group>
              <div class="flex"></div>
              <mwc-button raised id="add-keypair" icon="add" label="${v("credential.AddCredential")}"
                  @click="${this._launchKeyPairDialog}"></mwc-button>
            </h4>
            <backend-ai-credential-list class="list-content" id="active-credential-list" condition="active" ?active="${"credential-lists"===this._activeTab}"></backend-ai-credential-list>
            <backend-ai-credential-list class="list-content" style="display:none;" id="inactive-credential-list" condition="inactive" ?active="${"credential-lists"===this._activeTab}"></backend-ai-credential-list>
          </div>
          <div id="resource-policy-lists" class="admin item tab-content card" style="display:none;">
            <h4 class="horizontal flex center center-justified layout">
              <span>${v("credential.PolicyGroup")}</span>
              <span class="flex"></span>
              <mwc-button raised id="add-policy" icon="add" label="${v("credential.CreatePolicy")}"
                          ?disabled="${!this.isSuperAdmin}"
                          @click="${this._launchResourcePolicyDialog}"></mwc-button>
            </h4>
            <div>
              <backend-ai-resource-policy-list id="resource-policy-list" ?active="${"resource-policy-lists"===this._activeTab}"></backend-ai-resource-policy-list>
            </div>
          </div>
        </div>
      </lablup-activity-panel>
      <backend-ai-dialog id="new-keypair-dialog" fixed backdrop blockscrolling>
        <span slot="title">${v("credential.AddCredential")}</span>
        <div slot="content">
          <div class="vertical center-justified layout center">
            <mwc-textfield
                type="email"
                name="new_user_id"
                id="id_new_user_id"
                label="${v("credential.UserIDAsEmail")}"
                validationMessage="${v("credential.UserIDRequired")}"
                required
                maxLength="64"
                placeholder="${v("maxLength.64chars")}"
                autoValidate></mwc-textfield>

            <mwc-select outlined id="resource-policy" label="${v("credential.ResourcePolicy")}" style="width:100%;margin:10px 0;">
              ${this.resource_policy_names.map((e=>m`
                <mwc-list-item value="${e}">${e}</mwc-list-item>
              `))}
            </mwc-select>
            <mwc-select outlined id="rate-limit" label="${v("credential.RateLimitFor15min")}" style="width:100%;margin:10px 0;">
              ${this.rate_metric.map((e=>m`
                  <mwc-list-item value="${e}">${e}</mwc-list-item>
              `))}
            </mwc-select>
            <!--<wl-expansion name="advanced-keypair-info" style="width:100%;">
              <span slot="title">${v("general.Advanced")}</span>
              <span slot="description"></span>
              <div class="vertical layout center">
              <mwc-textfield
                  type="text"
                  name="new_access_key"
                  id="id_new_access_key"
                  label="${v("credential.UserIDAsEmail")}"
                  autoValidate></mwc-textfield>
              <mwc-textfield
                  type="text"
                  name="new_access_key"
                  id="id_new_secret_key"
                  label="${v("credential.AccessKeyOptional")}"
                  autoValidate
                  .value="${this.new_access_key}"><mwc-textfield>
              </div>
            </wl-expansion>-->
          </div>
        </div>
        <div slot="footer" class="horizontal center-justified flex layout">
          <mwc-button raised id="create-keypair-button" icon="add" label="${v("general.Add")}" fullwidth
          @click="${this._addKeyPair}"></mwc-button>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="new-policy-dialog" fixed backdrop blockscrolling narrowLayout>
        <span slot="title">${v("credential.CreateResourcePolicy")}</span>
        <div slot="content">
          <mwc-textfield id="id_new_policy_name" label="${v("resourcePolicy.PolicyName")}"
                         validationMessage="${v("data.explorer.ValueRequired")}"
                         maxLength="64"
                         placeholder="${v("maxLength.64chars")}"
                         required></mwc-textfield>
          <h4>${v("resourcePolicy.ResourcePolicy")}</h4>
          <div class="horizontal center layout distancing">
            <div class="vertical layout popup-right-margin">
              <wl-label>CPU</wl-label>
              <mwc-textfield class="discrete resource-input" id="cpu-resource" type="number" min="0" max="512"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
            </div>
            <div class="vertical layout popup-both-margin">
              <wl-label>RAM(GB)</wl-label>
              <mwc-textfield class="resource-input" id="ram-resource" type="number" min="0" max="100000" step="0.01"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical layout popup-both-margin">
              <wl-label>GPU</wl-label>
              <mwc-textfield class="resource-input" id="gpu-resource" type="number" min="0" max="64"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
            <div class="vertical layout popup-left-margin">
              <wl-label>fGPU</wl-label>
              <mwc-textfield class="resource-input" id="fgpu-resource" type="number" min="0" max="256" step="0.1"
                            @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              <wl-label class="unlimited">
                <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                ${v("resourcePolicy.Unlimited")}
              </wl-label>
            </div>
          </div>
          <h4>${v("resourcePolicy.Sessions")}</h4>
          <div class="horizontal justified layout distancing wrap">
            <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}">
                <wl-label>${v("resourcePolicy.ContainerPerSession")}</wl-label>
                <mwc-textfield class="discrete" id="container-per-session-limit" type="number" min="0" max="100"
                    @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
              </div>
              <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}">
                <wl-label>${v("resourcePolicy.IdleTimeoutSec")}</wl-label>
                <mwc-textfield class="discrete" id="idle-timeout" type="number" min="0" max="1552000"
                  @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
              </div>
              <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}">
                  <wl-label>${v("resourcePolicy.ConcurrentJobs")}</wl-label>
                  <mwc-textfield class="discrete" id="concurrency-limit" type="number" min="0" max="100"
                      @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                  <wl-label class="unlimited">
                    <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                   ${v("resourcePolicy.Unlimited")}
                  </wl-label>
              </div>
              <div class="vertical left layout ${this.enableSessionLifetime?"sessions-section":""}"
                style="${this.enableSessionLifetime?"":"display:none;"}">
                <wl-label>${v("resourcePolicy.MaxSessionLifeTime")}</wl-label>
                <mwc-textfield class="discrete" id="session-lifetime" type="number" min="0" max="100"
                    @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
              </div>
          </div>
          <h4 style="margin-bottom:0px;">${v("resourcePolicy.Folders")}</h4>
          <div class="vertical center layout distancing" id="dropdown-area">
            <backend-ai-multi-select open-up id="allowed-vfolder-hosts" label="${v("resourcePolicy.AllowedHosts")}" style="width:100%;"></backend-ai-multi-select>
            <div class="horizontal layout justified" style="width:100%;">
              <div class="vertical layout flex popup-right-margin">
                <wl-label class="folders">${v("resourcePolicy.Capacity")}(GB)</wl-label>
                <mwc-textfield id="vfolder-capacity-limit" type="number" min="0" max="1024" step="0.1"
                    @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
                <wl-label class="unlimited">
                  <wl-checkbox @change="${e=>this._toggleCheckbox(e)}"></wl-checkbox>
                  ${v("resourcePolicy.Unlimited")}
                </wl-label>
              </div>
              <div class="vertical layout flex popup-left-margin">
                <wl-label class="folders">${v("credential.Max#")}</wl-label>
                <mwc-textfield class="discrete" id="vfolder-count-limit" type="number" min="0" max="50"
                    @change="${e=>this._validateResourceInput(e)}"></mwc-textfield>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="horizontal center-justified flex layout distancing">
          <mwc-button
              unelevated
              fullwidth
              id="create-policy-button"
              icon="check"
              label="${v("credential.Create")}"
              @click="${()=>this._addResourcePolicy()}"></mwc-button>
        </div>
      </backend-ai-dialog>
      </backend-ai-dialog>
      <backend-ai-dialog id="new-user-dialog" fixed backdrop blockscrolling>
        <span slot="title">${v("credential.CreateUser")}</span>
        <div slot="content">
          <mwc-textfield
              type="email"
              name="user_email"
              id="id_user_email"
              label="${v("general.E-Mail")}"
              autoValidate
              required
              placeholder="${p("maxLength.64chars")}"
              maxLength="64"
              validationMessage="${p("credential.validation.InvalidEmailAddress")}">
          </mwc-textfield>
          <mwc-textfield
              type="text"
              name="user_name"
              id="id_user_name"
              label="${v("general.Username")}"
              placeholder="${p("maxLength.64chars")}"
              maxLength="64">
          </mwc-textfield>
          <div class="horizontal flex layout">
            <mwc-textfield
                type="password"
                name="user_password"
                id="id_user_password"
                label="${v("general.Password")}"
                autoValidate
                required
                pattern=${_.passwordRegex}
                validationMessage="${p("signup.PasswordInvalid")}"
                @change="${()=>this._validatePassword()}"
                maxLength="64">
            </mwc-textfield>
            <mwc-icon-button-toggle off onIcon="visibility" offIcon="visibility_off"
                @click="${e=>this._togglePasswordVisibility(e.target)}">
            </mwc-icon-button-toggle>
          </div>
          <div class="horizontal flex layout">
            <mwc-textfield
                type="password"
                name="user_confirm"
                id="id_user_confirm"
                label="${v("general.ConfirmPassword")}"
                autoValidate
                required
                pattern=${_.passwordRegex}
                validationMessage="${p("signup.PasswordNotMatched")}"
                @change="${()=>this._validatePassword()}"
                maxLength="64">
            </mwc-textfield>
            <mwc-icon-button-toggle off onIcon="visibility" offIcon="visibility_off"
                @click="${e=>this._togglePasswordVisibility(e.target)}">
            </mwc-icon-button-toggle>
          </div>
        </div>
        <div slot="footer" class="horizontal center-justified flex layout">
          <mwc-button raised id="create-user-button" icon="add" label="${v("credential.CreateUser")}" fullwidth
          @click="${this._addUser}"></mwc-button>
        </div>
      </backend-ai-dialog>
      <backend-ai-dialog id="export-to-csv" fixed backdrop blockscrolling>
        <span slot="title">${v("credential.ExportCSVFile")} (${this._activeTab})</span>

        <div slot="content" class="intro centered login-panel">
          <mwc-textfield id="export-file-name" label="${p("credential.FileName")}"
                          validationMessage="${p("credential.validation.LetterNumber-_dot")}"
                          value="${this._activeTab+"_"+this._defaultFileName}" required
                          placeholder="${v("maxLength.255chars")}"
                          maxLength="255"
          ></mwc-textfield>
        </div>
        <div slot="footer" class="horizontal end-justified flex layout">
          <mwc-button
              unelevated
              fullwidth
              icon="get_app"
              label="${v("credential.ExportCSVFile")}"
              @click="${this._exportToCSV}"></mwc-button>
        </div>
      </backend-ai-dialog>
    `}};e([t({type:Object})],R.prototype,"cpu_resource",void 0),e([t({type:Object})],R.prototype,"ram_resource",void 0),e([t({type:Object})],R.prototype,"gpu_resource",void 0),e([t({type:Object})],R.prototype,"fgpu_resource",void 0),e([t({type:Object})],R.prototype,"concurrency_limit",void 0),e([t({type:Object})],R.prototype,"idle_timeout",void 0),e([t({type:Object})],R.prototype,"session_lifetime",void 0),e([t({type:Object})],R.prototype,"vfolder_capacity",void 0),e([t({type:Object})],R.prototype,"vfolder_max_limit",void 0),e([t({type:Object})],R.prototype,"container_per_session_limit",void 0),e([t({type:Array})],R.prototype,"rate_metric",void 0),e([t({type:Object})],R.prototype,"resource_policies",void 0),e([t({type:Array})],R.prototype,"resource_policy_names",void 0),e([t({type:Boolean})],R.prototype,"isAdmin",void 0),e([t({type:Boolean})],R.prototype,"isSuperAdmin",void 0),e([t({type:String})],R.prototype,"_status",void 0),e([t({type:String})],R.prototype,"new_access_key",void 0),e([t({type:String})],R.prototype,"new_secret_key",void 0),e([t({type:String})],R.prototype,"_activeTab",void 0),e([t({type:Object})],R.prototype,"notification",void 0),e([t({type:String})],R.prototype,"_defaultFileName",void 0),e([t({type:Number})],R.prototype,"selectAreaHeight",void 0),e([t({type:Boolean})],R.prototype,"enableSessionLifetime",void 0),e([t({type:Boolean})],R.prototype,"enableParsingStoragePermissions",void 0),e([i("#active-credential-list")],R.prototype,"activeCredentialList",void 0),e([i("#inactive-credential-list")],R.prototype,"inactiveCredentialList",void 0),e([i("#active-user-list")],R.prototype,"activeUserList",void 0),e([i("#resource-policy-list")],R.prototype,"resourcePolicyList",void 0),e([i("#dropdown-area")],R.prototype,"dropdownArea",void 0),e([i("#rate-limit")],R.prototype,"rateLimit",void 0),e([i("#resource-policy")],R.prototype,"resourcePolicy",void 0),e([i("#id_user_email")],R.prototype,"userEmailInput",void 0),e([i("#id_new_policy_name")],R.prototype,"newPolicyNameInput",void 0),e([i("#id_new_user_id")],R.prototype,"userIdInput",void 0),e([i("#id_user_confirm")],R.prototype,"userPasswordConfirmInput",void 0),e([i("#id_user_name")],R.prototype,"userNameInput",void 0),e([i("#id_user_password")],R.prototype,"userPasswordInput",void 0),e([i("#new-keypair-dialog")],R.prototype,"newKeypairDialog",void 0),e([i("#new-policy-dialog")],R.prototype,"newPolicyDialog",void 0),e([i("#new-user-dialog")],R.prototype,"newUserDialog",void 0),e([i("#export-to-csv")],R.prototype,"exportToCsvDialog",void 0),e([i("#export-file-name")],R.prototype,"exportFileNameInput",void 0),e([i("#allowed-vfolder-hosts")],R.prototype,"allowedVfolderHostsSelect",void 0),e([g()],R.prototype,"all_vfolder_hosts",void 0),e([g()],R.prototype,"default_vfolder_host",void 0),e([g()],R.prototype,"vfolderPermissions",void 0),R=S=e([s("backend-ai-credential-view")],R);var U=R;export{U as default};
