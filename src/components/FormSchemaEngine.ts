export type FieldType =
  | 'text'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'file'
  | 'richtext'
  | 'number'
  | 'toggle'
  | 'radio'
  | 'rubric';

export interface RubricCriteria {
  criteria: string;
  marks: number;
  description: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[]; // Used for select, multiselect, radio
  required?: boolean;
  defaultValue?: any;
  category: 'basic' | 'subject' | 'curriculum' | 'role_specific';
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  rolePermissions: string[]; // Roles allowed to access/create this form
  fields: FormField[];
}

// 1. Subject specific fields generator helpers
export const getSubjectFields = (subject: string): FormField[] => {
  switch (subject) {
    case 'Physics':
      return [
        {
          name: 'topic',
          label: 'Physics Topic',
          type: 'select',
          options: ['Forces', 'Motion', 'Electricity', 'Waves', 'Energy', 'Thermal Physics', 'Atomic Physics', 'Practical Paper 6'],
          required: true,
          category: 'subject',
          defaultValue: 'Forces'
        },
        {
          name: 'paperType',
          label: 'Paper Type',
          type: 'select',
          options: ['Paper 1 (MCQ)', 'Paper 2 (Theory)', 'Paper 4 (Extended Theory)', 'Paper 6 (Alternative to Practical)'],
          required: true,
          category: 'subject',
          defaultValue: 'Paper 4 (Extended Theory)'
        },
        {
          name: 'formulaFocus',
          label: 'Formula Focus / Key Equations',
          type: 'text',
          placeholder: 'e.g., F = ma, v = u + at, P = VI',
          category: 'subject'
        },
        {
          name: 'diagramRequired',
          label: 'Diagram / Circuit Schematic Required?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'numericalQuestions',
          label: 'Number of Calculation / Numerical Questions',
          type: 'number',
          defaultValue: 5,
          category: 'subject',
          validation: { min: 0, max: 50 }
        },
        {
          name: 'practicalSkills',
          label: 'Practical Investigation Focus',
          type: 'multiselect',
          options: ['Plotting Graphs', 'Taking Measurements', 'Drawing Ray Diagrams', 'Assembling Circuits', 'Minimising Percentage Uncertainty'],
          category: 'subject'
        },
        {
          name: 'variantPaper',
          label: 'Exam Variant Code',
          type: 'select',
          options: ['Variant 1', 'Variant 2', 'Variant 3'],
          category: 'subject',
          defaultValue: 'Variant 2'
        },
        {
          name: 'calculatorAllowed',
          label: 'Scientific Calculator Permitted?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'markSchemeUpload',
          label: 'Upload Reference Worksheet / Mark Scheme (PDF)',
          type: 'file',
          category: 'subject'
        },
        {
          name: 'examinerReportLink',
          label: 'CIE Examiner Report Reference URL',
          type: 'text',
          placeholder: 'https://cambridgeinternational.org/reports/physics-p4',
          category: 'subject'
        },
        {
          name: 'difficulty',
          label: 'Academic Rigor / Difficulty Level',
          type: 'radio',
          options: ['Core Level', 'Extended Medium', 'Scholar Hard Core'],
          defaultValue: 'Extended Medium',
          category: 'subject'
        },
        {
          name: 'estimatedTime',
          label: 'Estimated Solving Time (Minutes)',
          type: 'number',
          defaultValue: 45,
          category: 'subject',
          validation: { min: 1, max: 180 }
        }
      ];

    case 'Chemistry':
      return [
        {
          name: 'topic',
          label: 'Chemistry Topic',
          type: 'select',
          options: ['Organic Chemistry', 'Acids and Bases', 'Electrolysis', 'Chemical Energetics', 'Periodic Table', 'Stoichiometry'],
          required: true,
          category: 'subject',
          defaultValue: 'Organic Chemistry'
        },
        {
          name: 'chemicalBranch',
          label: 'Chemistry Branch Area',
          type: 'radio',
          options: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Lab Chemistry'],
          defaultValue: 'Organic Chemistry',
          category: 'subject'
        },
        {
          name: 'equationBalancingRequired',
          label: 'Equation Balancing Exercises Enforced?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'reactionMechanism',
          label: 'Core Reaction Mechanism / Pathways',
          type: 'text',
          placeholder: 'e.g. Nucleophilic Substitution, Free Radical Halogenation',
          category: 'subject'
        },
        {
          name: 'practicalExperiment',
          label: 'Prescribed Practical Experiment Name',
          type: 'text',
          placeholder: 'e.g. Copper Sulfate Hydration, Salt Analysis Group III',
          category: 'subject'
        },
        {
          name: 'safetyNotes',
          label: 'Lab Safety Warnings & Hazard Notes',
          type: 'richtext',
          placeholder: 'Wear Safety Goggles. Handle concentrated solutions in chemical fume cup-boards.',
          category: 'subject'
        },
        {
          name: 'labMaterials',
          label: 'Lab Apparatus / Chemical Reagents Required',
          type: 'multiselect',
          options: ['Burette & Pipette', 'Hydrochloric Acid 1M', 'Silver Nitrate Solution', 'Phenolphthalein Indicator', 'Bunsen Burner'],
          category: 'subject'
        },
        {
          name: 'chemicalFormulaInput',
          label: 'Primary Chemical Target Formula',
          type: 'text',
          placeholder: 'e.g. C6H12O6, H2SO4, CuSO4.5H2O',
          category: 'subject'
        },
        {
          name: 'chemistryFocus',
          label: 'Lab Investigative Focus',
          type: 'select',
          options: ['Titration Curve Mapping', 'Salt Qualitative Analysis', 'Electrolysis Products', 'Reaction Rate Kinetics'],
          category: 'subject',
          defaultValue: 'Titration Curve Mapping'
        },
        {
          name: 'markSchemeUpload',
          label: 'Chemical Mark Scheme & Reference Equation Key',
          type: 'file',
          category: 'subject'
        },
        {
          name: 'difficulty',
          label: 'Apparatus Rigor Level',
          type: 'radio',
          options: ['Foundation', 'Concept Application', 'Advanced Lab Olympiad'],
          defaultValue: 'Concept Application',
          category: 'subject'
        }
      ];

    case 'Biology':
      return [
        {
          name: 'topic',
          label: 'Biology Topic',
          type: 'select',
          options: ['Cells', 'Enzymes', 'Respiration', 'Transport in Plants', 'Genetics', 'Ecology', 'Human Nutrition'],
          required: true,
          category: 'subject',
          defaultValue: 'Cells'
        },
        {
          name: 'diagramLabelingRequired',
          label: 'Anatomy / Diagram Labeling Required?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'practicalInvestigation',
          label: 'Ecology / Physiology Field Project Spec',
          type: 'text',
          placeholder: 'e.g., Effect of pH on Amylase Enzyme Activity',
          category: 'subject'
        },
        {
          name: 'microscopeWork',
          label: 'Requires Microscope / Slide Calibration?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'dataAnalysis',
          label: 'Data Analysis / Population Growth Modelling',
          type: 'richtext',
          placeholder: 'Analyse the exponential population growth curves and count standard error margins of the quadrats.',
          category: 'subject'
        },
        {
          name: 'experimentVariables',
          label: 'Control & Independent Variables Definition',
          type: 'text',
          placeholder: 'Dependent: oxygen released (cm3/min); Independent: Light Intensity',
          category: 'subject'
        },
        {
          name: 'biologyCategory',
          label: 'Biological Categorisation Focus',
          type: 'select',
          options: ['Human Physiology', 'Plant Bio & Photosynthesis', 'Ecology & Population', 'Genetics & Biotechnology'],
          defaultValue: 'Human Physiology',
          category: 'subject'
        },
        {
          name: 'paper6Skills',
          label: 'Alternative to Practical Paper 6 Metrics',
          type: 'multiselect',
          options: ['Draw Biological Specimen', 'Tabulate Raw Data Tables', 'Formulate Valid Hypotheses', 'Design Control Experiment'],
          category: 'subject'
        },
        {
          name: 'examinerReportLink',
          label: 'CIE Biology Examiner Board Guidelines URL',
          type: 'text',
          placeholder: 'https://cambridgeinternational.org/reports/biology-p6',
          category: 'subject'
        },
        {
          name: 'difficulty',
          label: 'Rigor Level',
          type: 'radio',
          options: ['Recall Level', 'Critical Analysis', 'Clinical Pathology Spec'],
          defaultValue: 'Critical Analysis',
          category: 'subject'
        }
      ];

    case 'Mathematics':
      return [
        {
          name: 'topic',
          label: 'Mathematics Topic',
          type: 'select',
          options: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics', 'Probability', 'Vectors', 'Functions'],
          required: true,
          category: 'subject',
          defaultValue: 'Algebra'
        },
        {
          name: 'calculatorMode',
          label: 'Calculator Permitted Status',
          type: 'select',
          options: ['Strict Non-Calculator Paper', 'Standard Scientific Permitted', 'Graphing GDC Allowed'],
          required: true,
          defaultValue: 'Standard Scientific Permitted',
          category: 'subject'
        },
        {
          name: 'paperTier',
          label: 'Mathematics Paper Tier',
          type: 'radio',
          options: ['Paper 2 (Core Basics)', 'Paper 4 (Extended Equations)', 'Paper 5 (A-Level Mechanics)', 'Paper 6 (A-Level Stats)'],
          defaultValue: 'Paper 4 (Extended Equations)',
          category: 'subject'
        },
        {
          name: 'formulaSheetAllowed',
          label: 'Formula Sheet / Trigonometric Identities Permitted?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'workingMarksEnabled',
          label: 'Enable Strict Step-by-Step Working Marks (Method Marks)?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'graphRequired',
          label: 'Requires Grid Paper / Axis Graph Construction?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'geometryDiagramRequired',
          label: 'Geometry Diagram / Compass Constructions Required?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'algebraStepsEnforced',
          label: 'Proof & Algebra Verification Enforced?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'difficulty',
          label: 'Numeric Challenge Tier',
          type: 'select',
          options: ['Foundation Arithmetic', 'Core Equations', 'Challenging Olympiad Proofs'],
          defaultValue: 'Core Equations',
          category: 'subject'
        },
        {
          name: 'timeLimit',
          label: 'Academic Time Limit (Minutes)',
          type: 'number',
          defaultValue: 60,
          category: 'subject',
          validation: { min: 5, max: 180 }
        }
      ];

    case 'English':
      return [
        {
          name: 'topic',
          label: 'English Focus Area',
          type: 'select',
          options: ['Directed Writing', 'Narrative Writing', 'Summary Writing', 'Poetry', 'Prose', 'Drama', 'Comprehension'],
          required: true,
          category: 'subject',
          defaultValue: 'Directed Writing'
        },
        {
          name: 'writingType',
          label: 'Writing Genre / Structure',
          type: 'select',
          options: ['Informal Argumentative Essay', 'Formal Business Letter Report', 'Imaginative Narrative Prose', 'Descriptive Visual Travelogue', 'Persuasive Speech Rhetoric'],
          defaultValue: 'Informal Argumentative Essay',
          category: 'subject'
        },
        {
          name: 'readingComprehension',
          label: 'Prescribed Text Comprehension Passage',
          type: 'richtext',
          placeholder: 'Insert the literary text excerpt here for reading analysis... (e.g., extract from Orwell, Shakespeare, Dickens)',
          category: 'subject'
        },
        {
          name: 'literatureText',
          label: 'Set Literature Poem / Play / Novel Name',
          type: 'text',
          placeholder: 'e.g. Macbeth (Shakespeare), Purple Hibiscus (Adichie)',
          category: 'subject'
        },
        {
          name: 'essayQuestion',
          label: 'Primary Analytical Essay Prompt',
          type: 'text',
          placeholder: 'How does the author convey tension and class separation in chapter 4?',
          required: true,
          category: 'subject'
        },
        {
          name: 'wordCount',
          label: 'Target Word Count Budget',
          type: 'number',
          defaultValue: 450,
          category: 'subject',
          validation: { min: 100, max: 2000 }
        },
        {
          name: 'grammarFocus',
          label: 'Grammar and Syntax Markers',
          type: 'text',
          placeholder: 'e.g. Complex Sentences, Punctuation Rigour, Passive Voice',
          category: 'subject'
        },
        {
          name: 'vocabularyFocus',
          label: 'Lexical Range & Vocabulary Vocabulary Words',
          type: 'multiselect',
          options: ['Sophisticated Metaphors', 'Adverbial Starters', 'Alliteration & Consonance', 'Sarcasm / Irony Rhetoric', 'Juxtaposition'],
          category: 'subject'
        },
        {
          name: 'speakingListeningComponent',
          label: 'Includes Speaking & Oral Presentation Score?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'rubricSelection',
          label: 'Grading Rubric Parameters',
          type: 'rubric',
          category: 'subject'
        },
        {
          name: 'teacherFeedbackNote',
          label: 'Interactive Stylistic Annotations & Feedback Fields',
          type: 'richtext',
          placeholder: 'Exemplary flow! Focus on expanding the depth of critical evaluation in paragraph 3.',
          category: 'subject'
        }
      ];

    case 'Business':
    case 'Economics':
      return [
        {
          name: 'topic',
          label: 'Business / Economics Topic',
          type: 'select',
          options: ['Marketing', 'Finance', 'Production', 'HR', 'Demand and Supply', 'Inflation', 'Exchange Rates'],
          required: true,
          category: 'subject',
          defaultValue: 'Marketing'
        },
        {
          name: 'caseStudy',
          label: 'Corporate / Macroeconomics Case Study Material',
          type: 'richtext',
          placeholder: 'Insert company dossier (e.g. Aramco Expansion, Tesla UAE logistics, Dubai Tourism pricing policies).',
          category: 'subject'
        },
        {
          name: 'commandWord',
          label: 'Examination Command Word',
          type: 'select',
          options: ['State & List (1-2 Marks)', 'Explain & Illustrate (4-6 Marks)', 'Analyse & Segment (8-10 Marks)', 'Evaluate & Formulate Recommendation (15-20 Marks)'],
          defaultValue: 'Analyse & Segment (8-10 Marks)',
          category: 'subject'
        },
        {
          name: 'marksAllocation',
          label: 'Total Question Mark Allocation',
          type: 'number',
          defaultValue: 12,
          category: 'subject'
        },
        {
          name: 'evaluationRequired',
          label: 'Evaluation & Final Judgment Paragraph Required?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'graphRequired',
          label: 'Requires Economic Curve Chart drawing? (e.g. Demand/Supply shift)',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'dataResponse',
          label: 'Data-Response Numerical Exercises Included?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'realWorldExample',
          label: 'Requires Real-World Global Case Studies?',
          type: 'text',
          placeholder: 'e.g. Comparison to Emirates Airlines yield operations or Dubai real estate supply indices',
          category: 'subject'
        },
        {
          name: 'essayStructure',
          label: 'Essay Blueprint & Scaffold Notes',
          type: 'text',
          placeholder: 'Intro -> Analytical Paragraphs (2) -> Counterargument -> Strategic Evaluation',
          category: 'subject'
        },
        {
          name: 'rubricMatrix',
          label: 'Command Rubrics Matrix Builder',
          type: 'rubric',
          category: 'subject'
        }
      ];

    case 'Accounting':
      return [
        {
          name: 'statementType',
          label: 'Accounting Statement Focus',
          type: 'select',
          options: ['Trial Balance', 'Statement of Financial Position (Balance Sheet)', 'Income Statement (Trading Account)', 'Manufacturing & Production Costs Ledger', 'Cash Book Reconciliations'],
          required: true,
          category: 'subject',
          defaultValue: 'Trial Balance'
        },
        {
          name: 'ledgerRequired',
          label: 'Requires Full Double-Entry T-Ledger Accounts?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'adjustments',
          label: 'Accruals, Prepayments, and Depreciation Adjustments',
          type: 'richtext',
          placeholder: '1. Machine depreciated at 15% using reducing balance. 2. Rent outstanding amounts to AED 12,000.',
          category: 'subject'
        },
        {
          name: 'ratioAnalysis',
          label: 'Financial Performance Ratio Analysis Spec',
          type: 'multiselect',
          options: ['Gross Profit Margin', 'Return on Capital Employed (ROCE)', 'Liquid Acid-Test Ratio', 'Trade Receivables Turnover days'],
          category: 'subject'
        },
        {
          name: 'marksAllocation',
          label: 'Marks Target',
          type: 'number',
          defaultValue: 25,
          category: 'subject'
        },
        {
          name: 'workingSpaceEnabled',
          label: 'Include Interactive Worksheet Scratchpad?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        }
      ];

    case 'Computer Science':
      return [
        {
          name: 'programmingLanguage',
          label: 'Core Programming Language',
          type: 'select',
          options: ['Python 3 (CIE Pseudocode subset)', 'VB.NET / C# Standard', 'Java / OOP Modules', 'HTML/CSS/JS Web Tech'],
          defaultValue: 'Python 3 (CIE Pseudocode subset)',
          required: true,
          category: 'subject'
        },
        {
          name: 'algorithmRequired',
          label: 'Requires Algorithm / Logic Design?',
          type: 'toggle',
          defaultValue: true,
          category: 'subject'
        },
        {
          name: 'pseudocode',
          label: 'Expected Pseudocode Snippet Skeleton',
          type: 'richtext',
          placeholder: 'DECLARE StudentScore : ARRAY[1..30] OF INTEGER\nFOR i <- 1 TO 30\n  INPUT StudentScore[i]\nNEXT i',
          category: 'subject'
        },
        {
          name: 'flowchartRequired',
          label: 'Upload Supporting Flowchart / Structure Chart (PNG/SVG)',
          type: 'file',
          category: 'subject'
        },
        {
          name: 'databaseTask',
          label: 'Relational Database / SQL Query Task Included?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'spreadsheetTask',
          label: 'Spreadsheet Formulas Task Enforced?',
          type: 'toggle',
          defaultValue: false,
          category: 'subject'
        },
        {
          name: 'debuggingTask',
          label: 'Identify & Rectify Debugging Bugs Exercise',
          type: 'richtext',
          placeholder: 'Find syntax and logic errors in the given array filtering loop.',
          category: 'subject'
        },
        {
          name: 'markScheme',
          label: 'Mark Scheme Syntax Key',
          type: 'richtext',
          placeholder: '1 mark for correct array declaration, 1 mark for correct loop ending bounds, 2 marks for conditional logic.',
          category: 'subject'
        }
      ];

    default:
      return [];
  }
};

// 2. Curriculum specific fields helpers
export const getCurriculumFields = (curriculum: string): FormField[] => {
  switch (curriculum) {
    case 'British':
    case 'IGCSE':
      return [
        {
          name: 'examBoard',
          label: 'British Exam Board',
          type: 'select',
          options: ['Cambridge (CAIE)', 'Pearson Edexcel', 'Oxford AQA Core International'],
          required: true,
          category: 'curriculum',
          defaultValue: 'Cambridge (CAIE)'
        },
        {
          name: 'syllabusCode',
          label: 'Official Syllabus Code',
          type: 'text',
          placeholder: 'e.g., CAIE Physics (0625) / Math (0580)',
          required: true,
          category: 'curriculum'
        },
        {
          name: 'paperNumber',
          label: 'Paper Component Number',
          type: 'select',
          options: ['Paper 1 (Core MCQ)', 'Paper 2 (Extended MCQ)', 'Paper 3 (Core Theory)', 'Paper 4 (Extended Theory)', 'Paper 5 (Practical Test)', 'Paper 6 (Alternative to Practical)'],
          required: true,
          category: 'curriculum',
          defaultValue: 'Paper 4 (Extended Theory)'
        },
        {
          name: 'variant',
          label: 'Paper Region Variant Number',
          type: 'select',
          options: ['Variant 1 (Zone 1)', 'Variant 2 (Zone 2 - UAE/Middle East)', 'Variant 3 (Zone 3)'],
          category: 'curriculum',
          defaultValue: 'Variant 2 (Zone 2 - UAE/Middle East)'
        },
        {
          name: 'pastPaperYear',
          label: 'Reference Past Paper Year',
          type: 'select',
          options: ['2026 specimen', '2025 past papers', '2024 past papers', '2023 past papers', '2022 past papers'],
          category: 'curriculum',
          defaultValue: '2025 past papers'
        },
        {
          name: 'examSession',
          label: 'Exam Timetable Session',
          type: 'select',
          options: ['Feb/March (India Series)', 'May/June (Summer Series)', 'Oct/Nov (Winter Series)'],
          category: 'curriculum',
          defaultValue: 'May/June (Summer Series)'
        },
        {
          name: 'candidateResponseSheet',
          label: 'Upload Exemplar Candidate Responses (High/Medium/Low)',
          type: 'file',
          category: 'curriculum'
        },
        {
          name: 'gradeBoundary',
          label: 'Target Grade Boundary Percentages',
          type: 'select',
          options: ['A* Boundary: 82%+', 'A Boundary: 70%+', 'B Boundary: 58%+', 'C Boundary: 45%+', 'D Level boundary'],
          category: 'curriculum',
          defaultValue: 'A* Boundary: 82%+'
        }
      ];

    case 'CBSE':
      return [
        {
          name: 'cbseClass',
          label: 'CBSE Secondary Board Class',
          type: 'select',
          options: ['Class IX (9th standard school)', 'Class X (10th Secondary Boards)', 'Class XI (11th standard)', 'Class XII (12th Senior Secondary Boards)'],
          required: true,
          category: 'curriculum',
          defaultValue: 'Class X (10th Secondary Boards)'
        },
        {
          name: 'ncertChapter',
          label: 'NCERT Textbook Chapter Spec',
          type: 'select',
          options: ['Chapter 1: Real Numbers / Chemical Reactions', 'Chapter 2: Polynomials / Acids Bases', 'Chapter 3: Quadratic Equations', 'Chapter 4: Triangles / Carbon Compounds', 'Chapter 5: Arithmetic Progressions', 'Chapter 6: Coordinate Geometry'],
          required: true,
          category: 'curriculum',
          defaultValue: 'Chapter 1: Real Numbers / Chemical Reactions'
        },
        {
          name: 'learningOutcome',
          label: 'CBSE Competency-Based Learning Outcome',
          type: 'text',
          placeholder: 'Determine and prove standard equations and balance chemical moles.',
          category: 'curriculum'
        },
        {
          name: 'questionType',
          label: 'CBSE Question Typology Matrix',
          type: 'multiselect',
          options: ['Multiple Choice Questions (MCQ 1-mark)', 'Assertion-Reason Competency Questions', 'Case Study Passage-Based Exercises', 'Competency-Based High Order Tasks', 'Short Answer Type I/II (2-3 marks)', 'Long Answer Essay Questions (5 marks)'],
          category: 'curriculum'
        },
        {
          name: 'boardPatternEnforced',
          label: 'Validate with Strict CBSE Board Board Pattern?',
          type: 'toggle',
          defaultValue: true,
          category: 'curriculum'
        },
        {
          name: 'preboardTag',
          label: 'Flag as Pre-Board Special Practice Resource?',
          type: 'toggle',
          defaultValue: false,
          category: 'curriculum'
        },
        {
          name: 'cbseMarksField',
          label: 'Total CBSE Scheme Marks',
          type: 'number',
          defaultValue: 80,
          category: 'curriculum'
        }
      ];

    case 'A-Level':
      return [
        {
          name: 'aLevelStage',
          label: 'Advanced Level Curriculum Stage',
          type: 'radio',
          options: ['Advanced Subsidiary (AS-Level)', 'Advanced Level Core Core (A2-Level)'],
          defaultValue: 'Advanced Subsidiary (AS-Level)',
          category: 'curriculum'
        },
        {
          name: 'aLevelPaper',
          label: 'A-Level Component Series',
          type: 'select',
          options: ['Paper 1 (Mechanics/AS Chemistry)', 'Paper 2 (Pure Math/Organic Chemistry)', 'Paper 3 (Advanced Practical skills)', 'Paper 4 (A2 theory/Pure Math 3)', 'Paper 5 (A2 Lab Planning/Mechanics 2)'],
          required: true,
          category: 'curriculum',
          defaultValue: 'Paper 1 (Mechanics/AS Chemistry)'
        },
        {
          name: 'aLevelUnit',
          label: 'Syllabus Unit Chapter Reference',
          type: 'text',
          placeholder: 'e.g., Unit 3: Thermodynamics, Unit 4: Linear Algebra',
          category: 'curriculum'
        },
        {
          name: 'structuredQuestionsRequired',
          label: 'Structured Analytical Questions Required?',
          type: 'toggle',
          defaultValue: true,
          category: 'curriculum'
        },
        {
          name: 'practicalPlanningRequired',
          label: 'Paper 5 Planning, Analysis & Evaluation Practice?',
          type: 'toggle',
          defaultValue: false,
          category: 'curriculum'
        },
        {
          name: 'evaluationMarks',
          label: 'Marks Allocated for Critical Appraisal/Evaluation',
          type: 'number',
          defaultValue: 15,
          category: 'curriculum'
        }
      ];

    default:
      return [];
  }
};

// 3. Complete context-aware formSchemas definition
export const formSchemas: Record<string, FormSchema> = {
  studentAdmission: {
    id: 'studentAdmission',
    title: 'Candidate Admission Intakes & Enrollment',
    description: 'Establish secure SaaS entry profiles, calculate localized discount budgets, and register batch streams.',
    rolePermissions: ['Super Admin', 'Branch Admin', 'Sales'],
    fields: [
      {
        name: 'studentName',
        label: 'Candidate Full Name',
        type: 'text',
        placeholder: 'e.g., Sara Al-Mansoori',
        required: true,
        category: 'basic'
      },
      {
        name: 'parentName',
        label: 'Parent / Legal Guardian Name',
        type: 'text',
        placeholder: 'e.g., Kabir Al-Mansoori',
        required: true,
        category: 'basic'
      },
      {
        name: 'contactNumber',
        label: 'UAE Contact Number (Mobile)',
        type: 'text',
        placeholder: '+971 50 xxx xxxx',
        required: true,
        category: 'basic'
      },
      {
        name: 'curriculum',
        label: 'Affiliated Academic Curriculum',
        type: 'select',
        options: ['British IGCSE', 'A-Level Stream', 'CBSE National boards', 'Creative Arts & Robotics'],
        required: true,
        category: 'basic',
        defaultValue: 'British IGCSE'
      },
      {
        name: 'gradeLevel',
        label: 'Target Secondary Grade Level',
        type: 'select',
        options: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
        required: true,
        category: 'basic',
        defaultValue: 'Grade 10'
      },
      {
        name: 'budget',
        label: 'Annual Fees Budget Limit (AED)',
        type: 'number',
        defaultValue: 6000,
        category: 'role_specific'
      },
      {
        name: 'preferredSchedule',
        label: 'Preferred Lesson Schedule Grid',
        type: 'select',
        options: ['Weekdays Evening (4 PM - 8 PM)', 'Weekend Intensive (Fridays/Saturdays)', 'Flexible Remote Interactive'],
        category: 'role_specific',
        defaultValue: 'Weekdays Evening (4 PM - 8 PM)'
      }
    ]
  },
  teacherAttendance: {
    id: 'teacherAttendance',
    title: 'Pedagogical Attendance Register & Class Logs',
    description: 'Enforce real-time physical attendance logging, write diagnostic teaching reviews, and track syllabus coverage.',
    rolePermissions: ['Super Admin', 'Branch Admin', 'Teacher', 'Academic Coordinator'],
    fields: [
      {
        name: 'batchName',
        label: 'Designated Class Batch',
        type: 'select',
        options: ['Batch A (Marina Heights)', 'Batch B (Qusais Express)', 'Global Remote IGCSE', 'CBSE 10th Intensive'],
        required: true,
        category: 'basic',
        defaultValue: 'Batch A (Marina Heights)'
      },
      {
        name: 'attendanceDate',
        label: 'Session Delivery Date',
        type: 'date',
        required: true,
        category: 'basic'
      },
      {
        name: 'attendanceCode',
        label: 'Class Status',
        type: 'radio',
        options: ['Fully Covered (Alices Present)', 'Incomplete Attendances', 'Rescheduled Makeup Session'],
        defaultValue: 'Fully Covered (Alices Present)',
        category: 'basic'
      },
      {
        name: 'syllabusCheckoff',
        label: 'Class Lesson Summary Notes',
        type: 'richtext',
        placeholder: 'Details what exercises or worksheets were finished during the lecture...',
        category: 'basic'
      }
    ]
  },
  physicsHomework: {
    id: 'physicsHomework',
    title: 'Physics Homework Assignment',
    description: 'Synthesize physics worksheets, set experimental paper criteria, and configure scientific parameters.',
    rolePermissions: ['Super Admin', 'Teacher', 'Academic Coordinator', 'Student'],
    fields: [
      {
        name: 'assignmentTitle',
        label: 'Homework Worksheet Title',
        type: 'text',
        placeholder: 'forces-extended-0625-w25-v2',
        required: true,
        category: 'basic'
      },
      {
        name: 'dueDate',
        label: 'Submission Deadline',
        type: 'date',
        required: true,
        category: 'basic'
      },
      {
        name: 'totalPoints',
        label: 'Max Graded Score (Marks)',
        type: 'number',
        defaultValue: 40,
        category: 'basic'
      }
    ]
  },
  chemistryTest: {
    id: 'chemistryTest',
    title: 'Chemistry Progressive Target Mock Exam',
    description: 'Establish titration salts benchmarks, balance formulas, and enforce laboratory security profiles.',
    rolePermissions: ['Super Admin', 'Teacher', 'Academic Coordinator'],
    fields: [
      {
        name: 'testTitle',
        label: 'Mock Test Title Name',
        type: 'text',
        placeholder: 'organic_pathways_stochiometry_oct25',
        required: true,
        category: 'basic'
      },
      {
        name: 'testDate',
        label: 'Date of Conduct',
        type: 'date',
        required: true,
        category: 'basic'
      },
      {
        name: 'totalMarks',
        label: 'Maximum Scale Marks',
        type: 'number',
        defaultValue: 50,
        category: 'basic'
      }
    ]
  },
  cbseMathExam: {
    id: 'cbseMathExam',
    title: 'CBSE Mathematics Board Assessment',
    description: 'Incorporate NCERT standard chapters, assertion-reason items, and enforce method proving marks.',
    rolePermissions: ['Super Admin', 'Teacher', 'Academic Coordinator'],
    fields: [
      {
        name: 'examTitle',
        label: 'CBSE Proving Exam Title',
        type: 'text',
        placeholder: 'CBSE 10th Math Board Revision Series',
        required: true,
        category: 'basic'
      },
      {
        name: 'assessmentDate',
        label: 'Assessment Date',
        type: 'date',
        category: 'basic'
      }
    ]
  },
  igcsePastPaper: {
    id: 'igcsePastPaper',
    title: 'IGCSE British Board Past Paper Mock',
    description: 'Synchronise syllabus component codes, variants, candidate response sheets, and boundaries.',
    rolePermissions: ['Super Admin', 'Teacher', 'Academic Coordinator', 'Student'],
    fields: [
      {
        name: 'mockTitle',
        label: 'Past Paper Practice Identifier',
        type: 'text',
        placeholder: 'CIE IGCSE 0580 Extended Mathematics P42 2025',
        required: true,
        category: 'basic'
      }
    ]
  },
  feeCollection: {
    id: 'feeCollection',
    title: 'VAT Invoices & SaaS Fee Receivables Ledger',
    description: 'Process immediate credit entries, configure installment schedules, discounts, and print VAT receipts.',
    rolePermissions: ['Super Admin', 'Finance Manager', 'Parent'],
    fields: [
      {
        name: 'studentName',
        label: 'Syllabus Beneficiary (Student)',
        type: 'select',
        options: ['Student 1', 'Student 7', 'Student 29', 'Student 30'],
        required: true,
        category: 'basic',
        defaultValue: 'Student 1'
      },
      {
        name: 'amountDue',
        label: 'Gross Fee Invoice Amount (AED)',
        type: 'number',
        defaultValue: 1840,
        required: true,
        category: 'basic'
      },
      {
        name: 'vatRate',
        label: 'Federal Tax Authority (FTA) VAT %',
        type: 'select',
        options: ['Zero Rated / Exempt', 'Standard Rated (5% UAE VAT)'],
        defaultValue: 'Standard Rated (5% UAE VAT)',
        category: 'role_specific'
      },
      {
        name: 'discountType',
        label: 'Scholarship / Sibling Discount Relief Code',
        type: 'select',
        options: ['No Discretionary Relief Applied', '10% Sibling Honor Reduction', '15% High-Scorer Scholarship', 'Seasonal Ramadan Waiver'],
        defaultValue: 'No Discretionary Relief Applied',
        category: 'role_specific'
      },
      {
        name: 'paymentPlan',
        label: 'Receivables Installment Schedule',
        type: 'radio',
        options: ['Comprehensive Advance payment', 'Direct Termly splits (3 Installments)', 'Monthly Standing SaaS recurring order'],
        defaultValue: 'Comprehensive Advance payment',
        category: 'role_specific'
      },
      {
        name: 'vatReceipt',
        label: 'Enclose Bank Wire / Credit Tx Receipt Statement',
        type: 'file',
        category: 'basic'
      }
    ]
  },
  parentMeeting: {
    id: 'parentMeeting',
    title: 'PTM Parent Teacher Meetings & Makeup Slots',
    description: 'Trigger counseling consult requests, write diagnostics feedback, and schedule makeup classes.',
    rolePermissions: ['Super Admin', 'Parent', 'Academic Coordinator', 'Sales'],
    fields: [
      {
        name: 'parentIdentifier',
        label: 'UAE Parent Mobile ID',
        type: 'text',
        placeholder: '+971 xx xxx xxxx',
        required: true,
        category: 'basic'
      },
      {
        name: 'slotTime',
        label: 'Preferable Timings Grid',
        type: 'date',
        required: true,
        category: 'basic'
      },
      {
        name: 'meetingReasons',
        label: 'Consultation Objectives',
        type: 'multiselect',
        options: ['Report card diagnostics review', 'Pre-board progression planning', 'Disciplinary alignment counseling', 'Syllabus catch-up makeup slot scheduling'],
        category: 'basic'
      },
      {
        name: 'parentFeedback',
        label: 'Absence / Request Justification Notes',
        type: 'richtext',
        placeholder: 'We require a weekend makeup class for Rohan as he was on official medical absence...',
        category: 'basic'
      }
    ]
  }
};
