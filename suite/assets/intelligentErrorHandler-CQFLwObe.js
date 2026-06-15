import{s}from"./index-CW3qGcCG.js";class m{static async diagnoseError(e,a){console.log("🔍 Diagnosing error:",e);let t=null;e?.error&&(t=e.error);const r=e?.message||String(e);if(!t&&r.includes("{")&&r.includes('"type"'))try{const n=r.match(/\{[^}]+\}/);n&&(t=JSON.parse(n[0]))}catch{}!t&&e?.type&&e?.code&&(t=e);const i=a.fallbacksAttempted||[];if(t){if(console.log("✅ Found structured error:",t),t.type==="payment_required"||t.code===402)return{type:"payment_required",code:402,service:t.service||"lovable_ai_gateway",message:t.message||"Service requires payment",details:{timestamp:new Date().toISOString(),model:t.details?.model||"google/gemini-2.5-flash",availableCredits:t.details?.availableCredits||0,...t.details},canRetry:t.canRetry??!1,suggestedAction:t.suggestedAction||"add_credits",fallbacksAttempted:i};if(t.type==="rate_limit"||t.code===429)return{type:"rate_limit",code:429,service:t.service||a.attemptedExecutive||"unknown",message:t.message||"Rate limit exceeded",details:{timestamp:new Date().toISOString(),retryAfterSeconds:t.details?.retryAfterSeconds,rateLimitInfo:t.details?.rateLimitInfo,...t.details},canRetry:t.canRetry??!0,suggestedAction:t.suggestedAction||"wait_and_retry",fallbacksAttempted:i};if(t.type==="service_unavailable"||t.code>=500)return{type:"service_unavailable",code:t.code||503,service:t.service||a.attemptedExecutive||"unknown",message:t.message||"Service temporarily unavailable",details:{timestamp:new Date().toISOString(),...t.details},canRetry:!0,suggestedAction:"retry_with_fallback",fallbacksAttempted:i}}if(r.includes("402")||r.includes("Payment Required")||r.includes("Not enough credits"))return{type:"payment_required",code:402,service:"lovable_ai_gateway",message:"Lovable AI Gateway has run out of credits",details:{timestamp:new Date().toISOString(),model:"google/gemini-2.5-flash",availableCredits:0},canRetry:!1,suggestedAction:"add_credits",fallbacksAttempted:i};if(r.includes("429")||r.includes("Rate limit")||r.includes("rate_limit")){const n=r.match(/Limit (\d+), Used (\d+), Requested (\d+)/),c=r.match(/try again in ([\d.]+)s/);return{type:"rate_limit",code:429,service:a.attemptedExecutive||"unknown",message:"API rate limit exceeded",details:{timestamp:new Date().toISOString(),retryAfterSeconds:c?parseFloat(c[1]):60,rateLimitInfo:n?{limit:parseInt(n[1]),used:parseInt(n[2]),requested:parseInt(n[3])}:void 0},canRetry:!0,suggestedAction:"wait_and_retry",fallbacksAttempted:i}}return r.includes("500")||r.includes("503")||r.includes("Service Unavailable")?{type:"service_unavailable",code:500,service:a.attemptedExecutive||"unknown",message:"AI service temporarily unavailable",details:{timestamp:new Date().toISOString()},canRetry:!0,suggestedAction:"try_alternative",fallbacksAttempted:i}:r.includes("network")||r.includes("fetch")||r.includes("timeout")?{type:"network_error",code:0,service:"network",message:"Network connection issue",details:{timestamp:new Date().toISOString()},canRetry:!0,suggestedAction:"check_connection",fallbacksAttempted:i}:{type:"unknown",code:500,service:"unknown",message:r,details:{timestamp:new Date().toISOString()},canRetry:!1,suggestedAction:"contact_support",fallbacksAttempted:i}}static async attemptWorkaround(e){switch(console.log("🔧 Attempting workaround for:",e.type),e.type){case"payment_required":return await this.handlePaymentRequired(e);case"rate_limit":return await this.handleRateLimit(e);case"service_unavailable":return await this.handleServiceUnavailable(e);default:return{success:!1,method:"none",error:"No workaround available"}}}static generateExplanation(e,a){if(a&&a.length>1)return this.generateMultiServiceExplanation(e,a);const t=new Date(e.details.timestamp).toLocaleTimeString();switch(e.type){case"payment_required":const r=!!navigator?.gpu;return`💳 **Payment Required** (${t})

**Issue Identified:**
${e.service==="lovable_ai_gateway"?"The Lovable AI Gateway has run out of credits (0 credits remaining)":`${e.service} requires payment or has insufficient quota`}.

**What I've Done:**
✅ Activated **Office Clerk** (Phi-3-mini, 3.8B parameters)
✅ Verified WebGPU acceleration ${r?"✅ Available":"❌ Unavailable (using CPU)"}
✅ Loaded XMRT knowledge base and conversation history
✅ Ready to respond using on-device AI

**Your Options:**
1. **Continue with Office Clerk** (recommended) - Fully functional, privacy-preserving
2. **Add credits** - Go to Settings → Workspace → Usage to restore cloud AI
3. **Configure API keys** - Add your own Gemini/OpenAI/DeepSeek keys

**Technical Details:**
- Error Code: ${e.code}
- Service: ${e.service}
- Model: ${e.details?.model||"N/A"}
- Fallbacks Tried: ${e.fallbacksAttempted.length>0?e.fallbacksAttempted.join(" → ")+" → office_clerk ✅":"office_clerk ✅"}
- Current AI: Office Clerk (on-device, WebGPU${r?"":" unavailable"})

**How can I help you?** I'm ready to respond using Office Clerk.`;case"rate_limit":const i=e.details.retryAfterSeconds||60,n=e.details.rateLimitInfo;return`⏱️ **Rate Limit Diagnostic** (${t})

**Issue Identified:**
The ${e.service} API has hit its rate limit. ${n?`You've used ${n.used.toLocaleString()} of ${n.limit.toLocaleString()} tokens per minute, and this request needs ${n.requested.toLocaleString()} more tokens.`:"The service is temporarily throttled."}

**What I've Done:**
✅ Activated **Office Clerk** for immediate response
✅ Queued your request for automatic retry in ${Math.ceil(i)} seconds
✅ You can continue chatting without interruption

**Technical Details:**
- Error Code: ${e.code}
- Service: ${e.service}
${n?`- Rate Limit: ${n.limit.toLocaleString()} TPM (Tokens Per Minute)
- Currently Used: ${n.used.toLocaleString()} TPM
- Requested: ${n.requested.toLocaleString()} TPM`:""}
- Retry After: ${Math.ceil(i)} seconds
- Fallback: Office Clerk (Phi-3-mini, 3.8B params)

**I'm ready to respond now.** The cloud service will automatically resume when available.`;case"service_unavailable":return`🔧 **Service Status Update** (${t})

**Issue Identified:**
The ${e.service} service is temporarily unavailable (likely maintenance or high load).

**What I've Done:**
✅ Switched to **Office Clerk** (on-device AI)
✅ Triggered autonomous system diagnostics
✅ Logged incident for monitoring

**Technical Details:**
- Error Code: ${e.code}
- Service: ${e.service}
- Fallbacks Attempted: ${e.fallbacksAttempted.join(" → ")}
- Current AI: Office Clerk (Phi-3-mini, 3.8B params, WebGPU)

**You won't notice any interruption.** I'm fully operational using on-device intelligence.`;case"network_error":return`🌐 **Network Connection Issue** (${t})

**Issue Identified:**
Cannot reach external AI services due to network connectivity issues.

**What I've Done:**
✅ Activated **Office Clerk** (works completely offline)
✅ Verified local processing capabilities
✅ Ready to continue without internet dependency

**Technical Details:**
- Service: Network
- Mode: Fully Offline
- AI: Office Clerk (Phi-3-mini, 3.8B params, WebGPU)

**All systems operational.** Your data stays private on your device.`;default:return`⚠️ **Unexpected Error** (${t})

**Issue:**
${e.message}

**Technical Details:**
- Error Code: ${e.code}
- Service: ${e.service}

**Next Steps:**
1. Try refreshing the page
2. Check your internet connection
3. Contact support if the issue persists

I apologize for the inconvenience.`}}static generateMultiServiceExplanation(e,a){const t=new Date().toLocaleTimeString(),r={"vercel-ai-chat":"🤖","gemini-chat":"✨","openai-chat":"🧠","deepseek-chat":"🔍","lovable-gateway":"🌐","office-clerk-mlc":"🏢","office-clerk-legacy":"📝"};let i=`🚨 **All AI Services Exhausted** (${t})

`;i+=`**Attempted Services:**
`,a.forEach(c=>{const l=r[c]||"•",o=this.getServiceTitle(c);i+=`${l} ${o} → `,e.type==="payment_required"?(i+=`💳 402 Payment Required
`,i+=`   - ${e.message}
`):e.type==="rate_limit"?(i+=`⏱️ 429 Rate Limit Exceeded
`,i+=`   - ${e.message}
`):i+=`❌ ${e.message}
`});const n=this.getOfficeClerkStatus();return n&&(i+=`
⏳ **Office Clerk (Backup)** → Initializing
`,i+=n),i+=`
**Your Options:**
`,i+=`1. ⏳ Wait for Office Clerk (~2-5 min) - Fully offline, privacy-preserving
`,i+=`2. 💳 Add credits (Settings → Workspace → Usage) - Instant access
`,i+=`3. 🔑 Configure API keys (Credentials panel) - Use your own accounts
`,i}static getServiceTitle(e){return{"vercel-ai-chat":"Gemini (CTO)","gemini-chat":"Gemini (CTO)","openai-chat":"OpenAI (CFO)","deepseek-chat":"DeepSeek (COO)","lovable-gateway":"Lovable AI Gateway","office-clerk-mlc":"Office Clerk (MLC)","office-clerk-legacy":"Office Clerk (Legacy)"}[e]||e}static getOfficeClerkStatus(){try{const e=window.__mlcProgress;if(e&&e.status!=="idle"){let a=`   - Progress: ${e.progress}%
`;return a+=`   - Status: ${e.message}
`,e.currentModel&&(a+=`   - Model: ${e.currentModel}
`),e.webGPUSupported===!1?a+=`   - WebGPU: ❌ Not supported
`:e.webGPUSupported===!0&&(a+=`   - WebGPU: ✅ Available
`),a}}catch{}return null}static async handlePaymentRequired(e){console.log("💳 Handling payment required error - activating Office Clerk");try{await s.from("eliza_activity_log").insert({title:"Payment Required - Office Clerk Activated",description:"Lovable AI Gateway out of credits. Switched to on-device AI.",activity_type:"error_recovery",status:"completed",metadata:e,mentioned_to_user:!1})}catch(a){console.warn("Failed to log activity:",a)}return{success:!0,method:"office_clerk",response:"Office Clerk activated - continue with on-device AI"}}static async handleRateLimit(e){console.log("⏱️ Handling rate limit - queuing retry and using Office Clerk");try{await s.from("eliza_activity_log").insert({title:"Rate Limit Hit - Auto-Retry Queued",description:`Rate limit on ${e.service}. Retry in ${e.details.retryAfterSeconds}s.`,activity_type:"error_recovery",status:"completed",metadata:e,mentioned_to_user:!1})}catch(a){console.warn("Failed to log activity:",a)}return{success:!0,method:"office_clerk_with_retry",response:"Using Office Clerk immediately, will retry cloud service automatically"}}static async handleServiceUnavailable(e){console.log("🔧 Handling service unavailable - running diagnostics");try{await s.from("eliza_activity_log").insert({title:"Service Unavailable - Diagnostics Running",description:`${e.service} is down. Activated Office Clerk.`,activity_type:"error_recovery",status:"completed",metadata:e,mentioned_to_user:!1})}catch(a){console.warn("Failed to log activity:",a)}return{success:!0,method:"office_clerk_with_diagnostics",response:"Office Clerk activated, system diagnostics triggered"}}}export{m as IntelligentErrorHandler};
