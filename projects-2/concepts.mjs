const briefs = [
  {
    slug: 'ai-deepfake-detector', title: 'AI Deepfake Detector', field: 'Video forensics',
    subtitle: 'Where does a clip deserve a closer look?',
    summary: 'A proposed review desk for examining video authenticity one segment at a time.',
    tools: ['Video decoding', 'Temporal analysis', 'Evidence review'],
    sections: [
      ['Review brief', 'An analyst would open a clip and inspect intervals with inconsistent visual signals. Original frames and quality notes would stay alongside each finding so a reviewer could judge how much weight to give it.'],
      ['Planned features', 'A frame timeline would link each observation to its timecode. Side-by-side crops could expose changes between adjacent frames. Reviewers could mark a segment inconclusive when compression, motion or lighting makes the evidence too weak.'],
      ['Proposed architecture', 'A decoder would preserve timestamps while a worker extracts aligned face regions. Independent temporal checks would produce observations with quality flags. A report builder would group those observations by interval for human review.']
    ],
    flow: ['Decode the clip', 'Align face regions', 'Compare intervals', 'Review evidence'],
    example: ['A reviewer loads an interview excerpt and selects a two-second window.', 'A head turn partly obscures one cheek, reducing the usable area.', 'The apparent difference coincides with a cut and a change in lighting.', 'The reviewer would record that interval as inconclusive and retain the frame references.']
  },
  {
    slug: 'rag-intelligence', title: 'RAG Intelligence', field: 'Document intelligence',
    subtitle: 'An answer with a reading trail.',
    summary: 'A document workspace concept for answering questions across a library and opening the passages behind each claim.',
    tools: ['Document parsing', 'Hybrid retrieval', 'Citations'],
    sections: [
      ['Reading brief', 'When two policy documents disagree, a reader needs to know which edition supports an answer. This concept would connect every answer to the document, page and passage used to construct it.'],
      ['Planned features', 'Readers could restrict a question to a collection or edition, compare retrieved passages and inspect citations in context. An unanswered question would show which sources were searched.'],
      ['Proposed architecture', 'An importer would preserve headings and page offsets. A retrieval service would combine keyword and semantic search before ranking the passages. A generation step would receive the selected evidence and return references the reader can open.']
    ],
    flow: ['Import documents', 'Retrieve passages', 'Compose a response', 'Inspect citations'],
    example: ['A collection contains two editions of a travel policy.', 'A question about reimbursement retrieves the allowance table from each edition.', 'The proposed response would explain which edition applies to the trip date.', 'Opening a citation would take the reader directly to that table.']
  },
  {
    slug: 'saas-automation', title: 'SaaS Automation', field: 'Workflow automation',
    subtitle: 'From an incoming request to a reviewed action.',
    summary: 'A proposed workflow builder for turning recurring requests into reviewable AI-assisted tasks.',
    tools: ['Event queue', 'Workflow state', 'Approvals'],
    sections: [
      ['Workflow brief', 'A support team may need to classify a request, prepare a draft and obtain approval before replying. The proposed builder would let the team define these steps once and inspect each run.'],
      ['Planned features', 'Triggers would start versioned workflows. A reviewer could edit a draft or stop a run. An activity log would show retries, approvals and the version of each workflow used.'],
      ['Proposed architecture', 'A tenant-scoped event queue would accept incoming requests. Workers would advance persisted steps and save intermediate output. An approval gate and idempotency key would govern delivery so retrying a worker could resume an interrupted run.']
    ],
    flow: ['Receive an event', 'Prepare a draft', 'Request approval', 'Record delivery'],
    example: ['A sample ticket asks for an invoice copy.', 'A drafting step would prepare a reply from an approved template.', 'A reviewer would check the recipient and attachment.', 'The run would store its delivery receipt alongside the approved draft.']
  },
  {
    slug: 'ml-research-lab', title: 'ML Research Lab', field: 'Predictive modelling',
    subtitle: 'Make two experiments comparable.',
    summary: 'An experiment notebook concept for tracing a predictive model back to its dataset, assumptions and evaluation.',
    tools: ['Dataset versions', 'Baseline models', 'Error analysis'],
    sections: [
      ['Research brief', 'A change in a score can come from the model, the split or the data itself. The proposed lab would keep those choices visible so a researcher could repeat a comparison and explain the differences.'],
      ['Planned features', 'Experiments could pin a dataset version, register a baseline and compare errors by subgroup or time window. Each run would carry its parameters, split definition and reproducibility notes.'],
      ['Proposed architecture', 'A dataset registry would supply immutable snapshots. An experiment runner would execute a recorded configuration and write predictions to an artifact store. A comparison view would group compatible runs and highlight changed inputs.']
    ],
    flow: ['Freeze a dataset', 'Run a baseline', 'Compare predictions', 'Inspect errors'],
    example: ['A sample study asks how to forecast weekly demand.', 'A seasonal baseline would use the same time-based split as a candidate model.', 'The comparison would plot both forecasts against held-out observations.', 'A researcher could inspect holiday weeks separately before drawing a conclusion.']
  },
  {
    slug: 'ai-agent-platform', title: 'AI Agent Platform', field: 'Autonomous agents',
    subtitle: 'A task, a boundary and a handoff.',
    summary: 'A platform concept for coordinating autonomous research agents with explicit tool permissions and review points.',
    tools: ['Task graph', 'Tool permissions', 'Checkpoints'],
    sections: [
      ['Platform brief', 'A research request can involve gathering sources, checking claims and preparing a draft. The proposed platform would assign each part to a bounded worker and let a person inspect intermediate results.'],
      ['Planned features', 'A run view would expose task dependencies, budgets and pending decisions. Operators could pause work, revise an instruction and resume from a saved checkpoint. Publication would require approval.'],
      ['Proposed architecture', 'A coordinator would persist a graph of tasks. Scoped workers would request tools through a policy layer and write their outputs to a shared run record. Checkpoints would keep the original inputs and review decisions available after interruption.']
    ],
    flow: ['Define a task', 'Assign workers', 'Review a checkpoint', 'Assemble a draft'],
    example: ['A user requests a literature summary from an approved reading list.', 'One worker would collect passages while another checks their dates.', 'A reviewer would flag a source that falls outside the requested period.', 'The coordinator would resume the affected task and assemble a draft for review.']
  }
];

export const concepts = briefs.map(brief => ({
  ...brief, kind: 'Upcoming concept', cover: brief.slug + '.webp'
}));
