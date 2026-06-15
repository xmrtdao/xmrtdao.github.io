import{G as m,s as o}from"./index-CW3qGcCG.js";class r{static instance;genAI;constructor(){this.genAI=new m("AIzaSyB3jfxdMQzPpIb5MNfT8DtP5MOvT_Sp7qk")}static getInstance(){return r.instance||(r.instance=new r),r.instance}async generateSummary(a){try{const e=this.genAI.getGenerativeModel({model:"gemini-2.0-flash-exp"}),t=`Analyze this conversation between a user and Eliza (XMRT-DAO AI assistant) and provide a STRUCTURED, DETAILED summary.

Format your response as:

**Key Topics:**
- [List main discussion topics]

**Important Decisions & Actions:**
- [List any decisions made, action items, or commitments]

**User Preferences & Context:**
- [User's communication style, technical level, stated preferences]
- [Specific interests in XMRT mining, DAO governance, or technical features]

**Technical Details Discussed:**
- [Specific commands, configurations, or technical information shared]

**Ongoing Context to Remember:**
- [Unresolved issues, pending questions, or continued threads]

Conversation:
${a.map(s=>`${s.sender==="user"?"User":"Eliza"}: ${s.content}`).join(`
`)}

Provide a comprehensive, structured summary:`;return(await e.generateContent(t)).response.text()||"Conversation summary unavailable"}catch(e){return console.error("Failed to generate conversation summary:",e),`Conversation with ${a.length} messages between user and Eliza about XMRT-DAO topics.`}}async storeSummary(a,e,n,t,i,c){try{const{data:s,error:d}=await o.from("conversation_summaries").insert({session_id:a,summary_text:e,message_count:n,start_message_id:t,end_message_id:i,metadata:c||{}}).select().single();return d?(console.error("Error storing conversation summary:",d),null):{id:s.id,sessionId:s.session_id,summaryText:s.summary_text,messageCount:s.message_count,startMessageId:s.start_message_id,endMessageId:s.end_message_id,createdAt:new Date(s.created_at),updatedAt:new Date(s.updated_at),metadata:s.metadata}}catch(s){return console.error("Failed to store conversation summary:",s),null}}async getLatestSummary(a){try{const{data:e,error:n}=await o.from("conversation_summaries").select("*").eq("session_id",a).order("created_at",{ascending:!1}).limit(1).maybeSingle();return n?(console.error("Error fetching latest summary:",n),null):e?{id:e.id,sessionId:e.session_id,summaryText:e.summary_text,messageCount:e.message_count,startMessageId:e.start_message_id,endMessageId:e.end_message_id,createdAt:new Date(e.created_at),updatedAt:new Date(e.updated_at),metadata:e.metadata}:null}catch(e){return console.error("Failed to get latest summary:",e),null}}async getSessionSummaries(a){try{const{data:e,error:n}=await o.from("conversation_summaries").select("*").eq("session_id",a).order("created_at",{ascending:!0});return n?(console.error("Error fetching session summaries:",n),[]):e?.map(t=>({id:t.id,sessionId:t.session_id,summaryText:t.summary_text,messageCount:t.message_count,startMessageId:t.start_message_id,endMessageId:t.end_message_id,createdAt:new Date(t.created_at),updatedAt:new Date(t.updated_at),metadata:t.metadata}))||[]}catch(e){return console.error("Failed to get session summaries:",e),[]}}shouldSummarize(a,e=0){return a-e>=15}}const l=r.getInstance();export{r as ConversationSummarizationService,l as conversationSummarization};
