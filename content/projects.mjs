// Published work and proposed studies share one card and page format.
export const projects = [
  {
    slug: 'lore', title: 'LORE', kind: 'Case study', field: 'Knowledge systems',
    subtitle: 'A workspace that remembers.',
    summary: 'A knowledge assistant that connects documents, decisions and working rules to the projects they belong to.',
    image: 'brain', plate: 'Base of the brain', featured: true,
    tools: ['React', 'TypeScript', 'Node.js', 'SQLite FTS5'],
    sections: [
      ['The problem', 'A proposal might live in a document while the rule for approving it lives in someone’s head. To help draft the next proposal, an assistant needs both. LORE keeps project records, source documents and explicit working rules in a persistent workspace.'],
      ['The adaptation', 'LORE builds on the MYND prototype. The adaptation adds the public entrance and editorial identity, and addresses browser navigation and document uploads. The retrieval, memory and task systems come from the upstream application.'],
      ['From upload to answer', 'The browser sends a document to an Express API. The server extracts its text and stores it with source metadata in the signed-in account’s SQLite index. When a question arrives, full-text search retrieves relevant passages. The configured model receives those passages alongside project context and memory. The interface streams the answer and lets the reader open its sources.'],
      ['Where the boundaries matter', 'Uploading a second file should preserve the first. LORE treats individual uploads as additions and reconciles folder uploads against the selected folder’s snapshot. Account context also follows each asynchronous request so that retrieval stays inside the right workspace.'],
      ['Working with the evidence', 'The knowledge map opens indexed material for inspection. Memory lets a user review and correct working rules. Tasks can hold a draft for revision, and supported external actions have approval checks. Generating answers requires a configured model provider.']
    ],
    flow: ['Upload a document', 'Extract and index text', 'Retrieve passages', 'Answer with sources'],
    gallery: [
      ['lore-landing','The public entrance','The engraved brain introduces how documents and decisions move into the workspace.'],
      ['lore-map','Inside the knowledge map','The local verification account contains uploaded documents that can be opened from the list.'],
      ['lore-document','Reading a source','Selecting a document exposes its extracted text, including the sample policy about two reviewers.']
    ],
    links: [
      ['LORE on GitHub (access required)', 'https://github.com/edwieee/lore'],
      ['Upstream MYND prototype', 'https://github.com/tobiadonadon1/myynd.prototype']
    ]
  },
  {
    slug: 'pulse-study', title: 'Pulse Study', kind: 'Research brief', field: 'AI forensics',
    subtitle: 'Reading a pulse in portrait video.',
    summary: 'Could tiny changes in facial colour help an analyst assess the authenticity of a video?',
    image: 'pulse', plate: 'Signal interference', tools: ['rPPG', 'Video authenticity', 'Digital trust'],
    sections: [
      ['The question', 'Remote photoplethysmography (rPPG) estimates pulse-related changes in light reflected from skin. The proposed study asks whether agreement between facial regions could contribute one piece of evidence during deepfake analysis.'],
      ['Proposed method', 'Track the cheeks and forehead across a consented clip, summarize colour changes over time, and compare the resulting signals. An analyst would see the traces alongside the frames and the intervals where tracking became unreliable.'],
      ['What would count as evidence?', 'Compare matched original and manipulated clips under different levels of compression, lighting and motion. Track false alarms on genuine video and reserve an inconclusive outcome for weak signals. This is a research proposal with no measured detection performance.']
    ],
    flow: ['Track facial regions', 'Estimate colour traces', 'Compare regions', 'Review signal quality'],
    links: [['Read the FakeCatcher paper','https://arxiv.org/abs/1901.02212']]
  },
  {
    slug: 'passage-index', title: 'Passage Index', kind: 'Concept brief', field: 'RAG',
    subtitle: 'Finding the paragraph behind an answer.',
    summary: 'A retrieval experiment tracing an answer back to a particular passage and edition.',
    image: 'passages', plate: 'Layered passages', tools: ['Retrieval', 'Citations', 'Evaluation'],
    sections: [
      ['The question','What happens to a citation when a handbook changes? This proposed reader would keep a link between each quoted passage, its file and the edition available when the question was asked.'],
      ['Proposed architecture','An importer would preserve headings and page boundaries. A retriever would return passages with edition identifiers, giving the reader enough context to inspect a citation beside the answer.'],
      ['First experiment','Build a small collection with two editions of the same handbook. Ask questions whose answers changed and record when retrieval selects the superseded passage.']
    ], flow: ['Import editions','Index passages','Retrieve evidence','Inspect citation']
  },
  {
    slug: 'meter-book', title: 'Meter Book', kind: 'Concept brief', field: 'SaaS',
    subtitle: 'A readable ledger for usage.',
    summary: 'A billing concept for explaining which usage events contributed to an invoice.',
    image: 'meter', plate: 'Graduated dial', tools: ['Usage metering','Event processing','Billing'],
    sections: [
      ['The question','A customer sees a monthly total. Which requests made up that number? The proposed ledger would let a team follow an invoice line back to the events behind it.'],
      ['Proposed architecture','A collector would record events using stable identifiers. A rating step would apply the price effective at the time of use and a statement view would show how individual entries add up.'],
      ['First experiment','Replay the same batch twice and introduce a late event after a statement closes. Check whether a reviewer can explain the total, the duplicate and the adjustment.']
    ], flow: ['Receive event','Deduplicate','Apply rate','Review statement']
  },
  {
    slug: 'handoff', title: 'Handoff', kind: 'Concept brief', field: 'Agents',
    subtitle: 'Work that pauses for a decision.',
    summary: 'A proposed agent workflow for reviewing a draft, changing its scope and resuming it.',
    image: 'handoff', plate: 'Intersecting orbits', tools: ['Task state','Human review','Resumption'],
    sections: [
      ['The question','When a brief changes halfway through a task, which parts of a draft can still be used? This concept explores the point where a person takes a decision back from an agent.'],
      ['Proposed architecture','Each run would keep its input, draft and checkpoint together. A review screen would show the pending decision. A revision would create a new version tied to the reviewer’s instructions.'],
      ['First experiment','Interrupt a draft during review, edit its instructions and reopen it in a new session. Verify that resuming selects the reviewed version and preserves the earlier draft.']
    ], flow: ['Receive brief','Prepare draft','Request review','Resume work']
  },
  {
    slug: 'trace-reader', title: 'Trace Reader', kind: 'Concept brief', field: 'Developer tools',
    subtitle: 'Following a request across services.',
    summary: 'A local trace viewer concept for investigating slow requests and missing spans.',
    image: 'trace', plate: 'Parallel traces', tools: ['Tracing','Local tooling','Observability'],
    sections: [
      ['The question','A request took five seconds. Was the delay in a service, between services, or in an interval nobody measured? This proposed tool would open an exported trace locally so a developer can follow its timing.'],
      ['Proposed architecture','A parser would group spans by trace identifier and parent. A timeline would show overlapping calls, with a detail view for durations, attributes and missing parents.'],
      ['First experiment','Start with one slow child span, a pair of overlapping calls and an incomplete trace. Test whether the display keeps gaps visible and avoids double-counting concurrent work.']
    ], flow: ['Open export','Group spans','Lay out timing','Inspect gaps']
  }
];
