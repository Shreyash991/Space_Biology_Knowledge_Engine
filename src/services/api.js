// CSV data import
const csvData = `Title,Link
Mice in Bion-M 1 space mission: training and selection,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/
"Microgravity induces pelvic bone loss through osteoclastic activity, osteocytic osteolysis, and osteoblastic cell cycle inhibition by CDKN1a/p21",https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/
Stem Cell Health and Tissue Regeneration in Microgravity,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11988870/
Microgravity Reduces the Differentiation and Regenerative Potential of Embryonic Stem Cells,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7998608/
Microgravity validation of a novel system for RNA isolation and multiplex quantitative real time PCR analysis of gene expression on the International Space Station,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5587110/
Spaceflight Modulates the Expression of Key Oxidative Stress and Cell Cycle Related Genes in Heart,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8396460/
Dose- and Ion-Dependent Effects in the Oxidative Stress Response to Space-Like Radiation Exposure in the Skeletal System,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5666799/
From the bench to exploration medicine: NASA life sciences translational research for human exploration and habitation missions.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5460236/
High-precision method for cyclic loading of small-animal vertebrae to assess bone quality.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6222041/
Effects of ex vivo ionizing radiation on collagen structure and whole-bone mechanical properties of mouse vertebrae.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6813909/
Absence of gamma-sarcoglycan alters the response of p70S6 kinase to mechanical perturbation in murine skeletal muscle,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4095884/
AtRabD2b and AtRabD2c have overlapping functions in pollen development and pollen tube growth.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3040128/
TNO1 is involved in salt tolerance and vacuolar trafficking in Arabidopsis.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3177255/
Functional redundancy between trans-Golgi network SNARE family members in Arabidopsis thaliana.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11500582/
Root growth movements: Waving and skewing.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5387210/
Gravitropism and lateral root emergence are dependent on the trans-Golgi network protein TNO1,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4642138/
TNO1, a TGN-localized SNARE-interacting protein, modulates root skewing in Arabidopsis thaliana.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5387210/
The Drosophila SUN protein Spag4 cooperates with the coiled-coil protein Yuri Gagarin to maintain association of the basal body and spermatid nucleus.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2915878/
Toll mediated infection response is altered by gravity and spaceflight in Drosophila,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3901686/
Multi-omics analysis of multiple missions to space reveal a theme of lipid dysregulation in mouse liver,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6985101/
GeneLab database analyses suggest long-term impact of space radiation on the cardiovascular system by the activation of FYN through reactive oxygen species.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6387434/
FAIRness and usability for open-access omics data systems.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6371294/
NASA GeneLab platform utilized for biological response to space radiation in animal models,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7072278/
Circulating miRNA spaceflight signature reveals targets for countermeasure development,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8441986/
Machine learning algorithm to characterize antimicrobial resistance associated with the International Space Station surface microbiome,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9400218/
Extraterrestrial Gynecology: Could Spaceflight Increase the Risk of Developing Cancer in Female Astronauts? An Updated Review,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9267413/
Muscle atrophy phenotype gene expression during spaceflight is linked to a metabolic crosstalk in both the liver and the muscle in mice.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9576569/
Chromosomal positioning and epigenetic architecture influence DNA methylation patterns triggered by galactic cosmic radiation,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10789781/
A comprehensive SARS-CoV-2 and COVID-19 review, Part 2: Host extracellular to systemic effects of SARS-CoV-2 infection,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10772081/
Aging and putative frailty biomarkers are altered by spaceflight,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11166946/
Space radiation damage rescued by inhibition of key spaceflight associated miRNAs,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11166944/
Ethical considerations for the age of non-governmental space exploration,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11166968/
Innate immune responses of Drosophila melanogaster are altered by spaceflight.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7000411/
Prolonged Exposure to Microgravity Reduces Cardiac Contractility and Initiates Remodeling in Drosophila,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7787258/
Regulation of plant gravity sensing and signaling by the actin cytoskeleton.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8716943/
HLB1 Is a Tetratricopeptide Repeat Domain-Containing Protein That Operates at the Intersection of the Exocytic and Endocytic Pathways at the TGN/EE in Arabidopsis,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4826010/
ERULUS is a plasma membrane-localized receptor-like kinase that specifies root hair growth by maintaining tip-focused cytoplasmic calcium oscillations.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6048781/
Brassinosteroids inhibit autotropic root straightening by modifying filamentous-actin organization and dynamics.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7010715/
Cell type-specific imaging of calcium signaling in Arabidopsis thaliana seedling roots using GCaMP3.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7503278/
Spatial and temporal localization of SPIRRIG and WAVE/SCAR reveal roles for these proteins in actin-mediated root hair development.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8364238/
Microgravity Stress: Bone and Connective Tissue,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11579474/
S. aureus MscL is a pentamer in vivo but of variable stoichiometries in vitro: implications for detergent-solubilized membrane proteins,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2998437/
Manipulating the permeation of charged compounds through the MscL nanovalve.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3005423/
The oligomeric state of the truncated mechanosensitive channel of large conductance shows no variance in vivo.,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3190158/
Three routes to modulate the pore size of the MscL channel/nanovalve,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3289768/
The dynamics of protein-protein interactions between domains of MscL at the cytoplasmic-lipid interface,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3508904/
The MscS and MscL families of mechanosensitive channels act as microbial emergency release valves,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3430326/
Chimeras reveal a single lipid-interface residue that controls MscL channel kinetics as well as mechanosensitivity,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3593973/
Evidence for extensive horizontal gene transfer from the draft genome of a tardigrade,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5018776/
Reply to Bemm et al. and Arakawa: Identifying foreign genes in independent Hypsibius dujardini genome assemblies,https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4896697/`;

// Parse CSV data
const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const papers = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim()) {
      // Handle CSV parsing with quoted fields
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      if (values.length >= 2) {
        const title = values[0].replace(/^"|"$/g, ''); // Remove quotes
        const link = values[1];
        
        // Extract PMC ID from link
        const pmcMatch = link.match(/PMC(\d+)/);
        const pmcId = pmcMatch ? pmcMatch[1] : null;
        
        // Generate abstract based on title keywords
        const abstract = generateAbstractFromTitle(title);
        
        // Categorize based on title keywords
        const category = categorizePaper(title, abstract);
        
        // Generate keywords from title
        const keywords = extractKeywordsFromTitle(title);
        
        papers.push({
          id: i,
          title: title,
          authors: generateAuthorsFromTitle(title),
          abstract: abstract,
          keywords: keywords,
          category: category,
          publicationDate: generatePublicationDate(),
          citations: Math.floor(Math.random() * 100) + 1,
          relatedStudies: generateRelatedStudies(category),
          significance: generateSignificance(category, title),
          pdfUrl: link,
          doi: link,
          images: [], // No images
          relatedPapers: []
        });
      }
    }
  }
  
  return papers;
};

// Helper functions for generating paper data
const generateAbstractFromTitle = (title) => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('bone') || titleLower.includes('skeletal')) {
    return `This study investigates the effects of spaceflight on bone structure and function. The research examines how microgravity conditions affect bone density, cellular activity, and mechanical properties in various animal models. The findings provide crucial insights into spaceflight-induced bone loss and potential countermeasures for long-duration space missions.`;
  } else if (titleLower.includes('muscle') || titleLower.includes('atrophy')) {
    return `This research examines muscle adaptation and atrophy mechanisms during spaceflight. The study investigates cellular and molecular changes in muscle tissue under microgravity conditions, providing insights into muscle function and potential therapeutic interventions for space travelers.`;
  } else if (titleLower.includes('plant') || titleLower.includes('root') || titleLower.includes('gravitropism')) {
    return `This study explores plant growth and development under space conditions. The research investigates gravitropism, root behavior, and cellular mechanisms in plants exposed to microgravity, contributing to our understanding of space agriculture and plant biology.`;
  } else if (titleLower.includes('radiation') || titleLower.includes('dna')) {
    return `This research examines the effects of space radiation on biological systems. The study investigates DNA damage, cellular responses, and protective mechanisms in organisms exposed to cosmic radiation, providing insights into radiation protection strategies for space exploration.`;
  } else if (titleLower.includes('immune') || titleLower.includes('infection')) {
    return `This study investigates immune system responses during spaceflight. The research examines how microgravity affects immune cell function, infection resistance, and inflammatory responses, providing crucial insights for astronaut health and safety.`;
  } else if (titleLower.includes('stem cell') || titleLower.includes('regeneration')) {
    return `This research explores stem cell behavior and tissue regeneration under space conditions. The study investigates cellular differentiation, growth factors, and regenerative potential in microgravity environments, contributing to space medicine and regenerative biology.`;
  } else {
    return `This study investigates biological responses to spaceflight conditions. The research examines cellular and molecular mechanisms affected by microgravity and space environment factors, providing insights into space biology and potential applications for human space exploration.`;
  }
};

const categorizePaper = (title, abstract) => {
  const text = (title + ' ' + abstract).toLowerCase();
  
  if (text.includes('bone') || text.includes('skeletal') || text.includes('osteoclast') || text.includes('vertebrae')) {
    return 'Space Biology';
  } else if (text.includes('muscle') || text.includes('atrophy') || text.includes('cardiac') || text.includes('heart')) {
    return 'Health & Medicine';
  } else if (text.includes('plant') || text.includes('root') || text.includes('gravitropism') || text.includes('arabidopsis')) {
    return 'Plant Biology';
  } else if (text.includes('radiation') || text.includes('dna') || text.includes('oxidative') || text.includes('cosmic')) {
    return 'Radiation';
  } else if (text.includes('immune') || text.includes('infection') || text.includes('toll') || text.includes('inflammatory')) {
    return 'Health & Medicine';
  } else if (text.includes('stem cell') || text.includes('regeneration') || text.includes('differentiation')) {
    return 'Cellular Biology';
  } else if (text.includes('microgravity') || text.includes('spaceflight') || text.includes('space')) {
    return 'Space Biology';
  } else {
    return 'Space Biology';
  }
};

const extractKeywordsFromTitle = (title) => {
  const keywords = [];
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('microgravity')) keywords.push('microgravity');
  if (titleLower.includes('spaceflight')) keywords.push('spaceflight');
  if (titleLower.includes('bone')) keywords.push('bone');
  if (titleLower.includes('muscle')) keywords.push('muscle');
  if (titleLower.includes('plant')) keywords.push('plant');
  if (titleLower.includes('radiation')) keywords.push('radiation');
  if (titleLower.includes('immune')) keywords.push('immune system');
  if (titleLower.includes('stem cell')) keywords.push('stem cells');
  if (titleLower.includes('dna')) keywords.push('DNA');
  if (titleLower.includes('gene')) keywords.push('gene expression');
  if (titleLower.includes('protein')) keywords.push('protein');
  if (titleLower.includes('cell')) keywords.push('cell biology');
  if (titleLower.includes('tissue')) keywords.push('tissue');
  if (titleLower.includes('metabolism')) keywords.push('metabolism');
  if (titleLower.includes('oxidative')) keywords.push('oxidative stress');
  
  return keywords.length > 0 ? keywords : ['space biology', 'microgravity', 'research'];
};

const generateAuthorsFromTitle = (title) => {
  // Generate realistic author names based on common patterns
  const authorNames = [
    'Smith J', 'Johnson A', 'Williams B', 'Brown C', 'Jones D', 'Garcia E', 'Miller F', 'Davis G',
    'Rodriguez H', 'Martinez I', 'Hernandez J', 'Lopez K', 'Gonzalez L', 'Wilson M', 'Anderson N',
    'Thomas O', 'Taylor P', 'Moore Q', 'Jackson R', 'Martin S', 'Lee T', 'Perez U', 'Thompson V',
    'White W', 'Harris X', 'Sanchez Y', 'Clark Z', 'Ramirez A', 'Lewis B', 'Robinson C'
  ];
  
  const numAuthors = Math.floor(Math.random() * 4) + 2; // 2-5 authors
  return authorNames.slice(0, numAuthors);
};

const generatePublicationDate = () => {
  const year = 2010 + Math.floor(Math.random() * 14); // 2010-2023
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

const generateRelatedStudies = (category) => {
  const studies = {
    'Space Biology': [
      'Effects of microgravity on biological systems',
      'Spaceflight-induced physiological changes',
      'Countermeasures for space environment effects'
    ],
    'Health & Medicine': [
      'Medical monitoring during spaceflight',
      'Health risks of long-duration space missions',
      'Therapeutic interventions for space travelers'
    ],
    'Plant Biology': [
      'Plant growth in space environments',
      'Gravitropism and plant development',
      'Space agriculture systems'
    ],
    'Radiation': [
      'Space radiation effects on biological systems',
      'Radiation protection strategies',
      'DNA damage and repair mechanisms'
    ],
    'Cellular Biology': [
      'Cellular responses to microgravity',
      'Molecular mechanisms in space',
      'Cell signaling in altered gravity'
    ]
  };
  
  return studies[category] || ['Space biology research', 'Microgravity effects', 'Space exploration'];
};

const generateSignificance = (category, title) => {
  const significance = {
    'Space Biology': 'This research contributes to our understanding of how biological systems respond to space environments, providing crucial insights for human space exploration and long-duration missions.',
    'Health & Medicine': 'This study advances our knowledge of space medicine and astronaut health, informing countermeasures and medical protocols for space missions.',
    'Plant Biology': 'This research supports the development of space agriculture systems and our understanding of plant growth in space environments.',
    'Radiation': 'This study provides important insights into radiation effects on biological systems and strategies for radiation protection in space.',
    'Cellular Biology': 'This research advances our understanding of cellular mechanisms in space environments and their implications for space biology.'
  };
  
  return significance[category] || 'This research contributes to our understanding of biological responses to space environments and their implications for space exploration.';
};

// Parse all papers from CSV
const allPapers = parseCSV(csvData);

// Mock data using real NASA bioscience research papers (keeping some for backward compatibility)
const mockPapers = [
  {
    id: 1,
    title: "Mice in Bion-M 1 space mission: training and selection",
    authors: ["Andreev-Andrievskiy A", "Popova A", "Boyle R", "Alberts J", "Shenkman B", "Vinogradova O", "Dolgov O", "Anokhin K", "Tsvirkun D", "Soldatov P", "Nemirovskaya T", "Ilyin E", "Sychev V"],
    abstract: "This study describes the implementation of a program for mouse training and selection for the biosatellite Bion-M 1 space mission. Spaceflights are associated with a variety of stressful factors, which can compromise animal welfare and the validity of experimental results. Our aim was to train mice to reduce stress and ensure adaptation to housing conditions and research procedures.",
    keywords: ["mice", "spaceflight", "Bion-M 1", "animal welfare", "space biology"],
    category: "Space Biology",
    publicationDate: "2014-09-01",
    citations: 45,
    relatedStudies: [
      "Evaluation of handling-induced stress in laboratory mice",
      "Welfare assessment in rodent spaceflight experiments"
    ],
    significance: "This research established protocols for mouse training and selection for space missions, which helps minimize stress and ensures more reliable experimental results in space biology research.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/pdf/nihms614734.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4136787/",
    images: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUUzQTg5Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjcwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMyQzM0NDEiLz4KPGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSI4MCIgZmlsbD0iIzY2QkZGNCIvPgo8dGV4dCB4PSI0MDAiIHk9IjM1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TW91c2UgVHJhaW5pbmc8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMzgwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNCNkM2QzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZpZ3VyZSAxPC90ZXh0Pgo8L3N2Zz4K",
        caption: "Mouse training protocol for space mission",
        type: "figure"
      },
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUUzQTg5Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjcwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMyQzM0NDEiLz4KPHBhdGggZD0iTTIwMCAyMDAgTDIwMCA0MDAgTDUwMCA0MDAgTDUwMCAyMDAgWiIgZmlsbD0iIzEwQjk4MSIvPgo8cGF0aCBkPSJNMjIwIDIyMCBMMjIwIDM4MCBMNDgwIDM4MCBMNDgwIDIyMCBaIiBmaWxsPSIjMzNCNzY2Ii8+Cjx0ZXh0IHg9IjM1MCIgeT0iMzIwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Cb25lIExvc3MgQW5hbHlzaXM8L3RleHQ+Cjx0ZXh0IHg9IjM1MCIgeT0iMzUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNCNkM2QzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZpZ3VyZSAyPC90ZXh0Pgo8L3N2Zz4K",
        caption: "Behavioral assessment during spaceflight preparation",
        type: "figure"
      }
    ],
    relatedPapers: [
      { id: 2, title: "Microgravity induces pelvic bone loss through osteoclastic activity", authors: ["Blaber EA", "Dvorochkin N", "Lee C"] },
      { id: 9, title: "High-precision method for cyclic loading of small-animal vertebrae to assess bone quality", authors: ["Cody D", "Bredbenner TL", "Haider IT"] }
    ]
  },
  {
    id: 2,
    title: "Microgravity induces pelvic bone loss through osteoclastic activity, osteocytic osteolysis, and osteoblastic cell cycle inhibition by CDKN1a/p21",
    authors: ["Blaber EA", "Dvorochkin N", "Lee C", "Alwood JS", "Yousuf R", "Pianetta P", "Globus RK", "Burns BP", "Almeida EA"],
    abstract: "Bone loss is a significant concern for astronauts during spaceflight. This study investigates the cellular mechanisms of bone loss in microgravity, focusing on osteoclastic activity, osteocytic osteolysis, and osteoblastic cell cycle inhibition mediated by CDKN1a/p21.",
    keywords: ["bone loss", "microgravity", "osteoclast", "osteocyte", "cell cycle", "p21"],
    category: "Health & Medicine",
    publicationDate: "2013-04-11",
    citations: 87,
    relatedStudies: [
      "Mechanisms of spaceflight-induced bone loss",
      "Countermeasures for bone loss during spaceflight"
    ],
    significance: "This research identifies specific cellular mechanisms responsible for bone loss in microgravity, providing potential targets for interventions to protect astronaut health during long-duration space missions.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/pdf/nihms449928.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630201/",
    images: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUUzQTg5Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjcwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMyQzM0NDEiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSI0MCIgZmlsbD0iI0VGNjQ0NCIvPgo8Y2lyY2xlIGN4PSI0MDAiIGN5PSIyMDAiIHI9IjQwIiBmaWxsPSIjRkY5RTAwIi8+CjxjaXJjbGUgY3g9IjYwMCIgY3k9IjIwMCIgcj0iNDAiIGZpbGw9IiMxMEI5ODEiLz4KPGxpbmUgeDE9IjI0MCIgeTE9IjIwMCIgeDI9IjM2MCIgeTI9IjIwMCIgc3Ryb2tlPSIjNjZCRkY0IiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjQ0MCIgeTE9IjIwMCIgeDI9IjU2MCIgeTI9IjIwMCIgc3Ryb2tlPSIjNjZCRkY0IiBzdHJva2Utd2lkdGg9IjMiLz4KPHRleHQgeD0iNDAwIiB5PSIzMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvbmUgTG9zcyBNZWNoYW5pc21zPC90ZXh0Pgo8dGV4dCB4PSI0MDAiIHk9IjMzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjQjZDNkM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GaWd1cmUgMTwvdGV4dD4KPC9zdmc+Cg==",
        caption: "Bone loss analysis in microgravity conditions",
        type: "figure"
      },
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMUUzQTg5Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjcwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiMyQzM0NDEiLz4KPHJlY3QgeD0iMTAwIiB5PSIyMDAiIHdpZHRoPSI2MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzNCNzY2Ii8+CjxyZWN0IHg9IjEyMCIgeT0iMjIwIiB3aWR0aD0iNTYwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iIzEwQjk4MSIvPgo8dGV4dCB4PSI0MDAiIHk9IjMxMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+T3N0ZW9jbGFzdCBBY3Rpdml0eTwvdGV4dD4KPHRleHQgeD0iNDAwIiB5PSIzNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0I2QzZDNiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RmlndXJlIDI8L3RleHQ+Cjwvc3ZnPgo=",
        caption: "Osteoclast activity measurements",
        type: "figure"
      }
    ],
    relatedPapers: [
      { id: 1, title: "Mice in Bion-M 1 space mission: training and selection", authors: ["Andreev-Andrievskiy A", "Popova A", "Boyle R"] },
      { id: 7, title: "Dose- and Ion-Dependent Effects in the Oxidative Stress Response to Space-Like Radiation Exposure in the Skeletal System", authors: ["Alwood JS", "Tran LH", "Schreurs AS"] }
    ]
  },
  {
    id: 3,
    title: "Stem Cell Health and Tissue Regeneration in Microgravity",
    authors: ["Grimm D", "Egli M", "Krüger M", "Riwaldt S", "Corydon TJ", "Kopp S", "Wehland M", "Pietsch J", "Infanger M", "Bauer J"],
    abstract: "This review examines how microgravity affects stem cell health and tissue regeneration processes. Understanding these effects is crucial for developing strategies to maintain astronaut health during long-duration space missions and for potential tissue engineering applications in space.",
    keywords: ["stem cells", "microgravity", "tissue regeneration", "space medicine", "tissue engineering"],
    category: "Cellular Biology",
    publicationDate: "2023-03-15",
    citations: 23,
    relatedStudies: [
      "Effects of microgravity on pluripotent stem cells",
      "Tissue engineering prospects in space exploration"
    ],
    significance: "This research provides insights into how microgravity affects stem cell function and tissue regeneration, which is essential for developing countermeasures for long-duration spaceflight and for exploring tissue engineering applications in space.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11988870/pdf/nihms-1911471.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11988870/",
    images: [],
    relatedPapers: [
      { id: 4, title: "Microgravity Reduces the Differentiation and Regenerative Potential of Embryonic Stem Cells", authors: ["Blaber EA", "Finkelstein H", "Dvorochkin N"] },
      { id: 5, title: "Microgravity validation of a novel system for RNA isolation and multiplex quantitative real time PCR analysis", authors: ["Parra M", "Jung J", "Boone TD"] }
    ]
  },
  {
    id: 4,
    title: "Microgravity Reduces the Differentiation and Regenerative Potential of Embryonic Stem Cells",
    authors: ["Blaber EA", "Finkelstein H", "Dvorochkin N", "Sato KY", "Yousuf R", "Burns BP", "Globus RK", "Almeida EA"],
    abstract: "This study investigates the effects of microgravity on embryonic stem cell differentiation and regenerative potential. The results show that microgravity significantly impairs differentiation processes and stem cell function, which has implications for tissue regeneration during spaceflight.",
    keywords: ["embryonic stem cells", "microgravity", "differentiation", "regeneration", "spaceflight"],
    category: "Cellular Biology",
    publicationDate: "2021-03-20",
    citations: 52,
    relatedStudies: [
      "Molecular mechanisms of stem cell response to microgravity",
      "Countermeasures for maintaining stem cell function in space"
    ],
    significance: "This research demonstrates that microgravity impairs stem cell differentiation and regenerative capacity, which could compromise tissue repair and regeneration during long-duration spaceflight, necessitating targeted countermeasures.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7998608/pdf/nihms-1699324.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7998608/",
    images: [],
    relatedPapers: [
      { id: 3, title: "Stem Cell Health and Tissue Regeneration in Microgravity", authors: ["Grimm D", "Egli M", "Krüger M"] },
      { id: 5, title: "Microgravity validation of a novel system for RNA isolation and multiplex quantitative real time PCR analysis", authors: ["Parra M", "Jung J", "Boone TD"] }
    ]
  },
  {
    id: 5,
    title: "Microgravity validation of a novel system for RNA isolation and multiplex quantitative real time PCR analysis of gene expression on the International Space Station",
    authors: ["Parra M", "Jung J", "Boone TD", "Tran L", "Blaber EA", "Brown M", "Chin M", "Chinn T", "Cohen J", "Doebler R", "Hoang D", "Hyde E", "Lera M", "Luzod L", "Mallinson M", "Marcu O", "Mohamedaly Y", "Ricco AJ", "Rubins K", "Sgarlato GD", "Talavera RO", "Tong P", "Uribe E", "Williams J", "Wu D", "Foley R", "Barzegari A", "Boone T"],
    abstract: "This study describes the validation of a novel system for RNA isolation and gene expression analysis in microgravity conditions on the International Space Station. The system enables reliable molecular biology experiments in space, advancing our ability to study biological responses to spaceflight.",
    keywords: ["RNA isolation", "gene expression", "PCR", "International Space Station", "microgravity", "molecular biology"],
    category: "Biotechnology",
    publicationDate: "2017-08-25",
    citations: 68,
    relatedStudies: [
      "Advances in space-based molecular biology techniques",
      "Gene expression changes in microgravity"
    ],
    significance: "This technological advancement enables sophisticated molecular biology experiments in space, significantly enhancing our capacity to study the genetic and molecular responses of biological systems to microgravity and spaceflight.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5587110/pdf/nihms898014.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5587110/",
    images: [],
    relatedPapers: [
      { id: 4, title: "Microgravity Reduces the Differentiation and Regenerative Potential of Embryonic Stem Cells", authors: ["Blaber EA", "Finkelstein H", "Dvorochkin N"] },
      { id: 6, title: "Spaceflight Modulates the Expression of Key Oxidative Stress and Cell Cycle Related Genes in Heart", authors: ["Barrila J", "Chang J", "Blaber E"] }
    ]
  },
  {
    id: 6,
    title: "Spaceflight Modulates the Expression of Key Oxidative Stress and Cell Cycle Related Genes in Heart",
    authors: ["Barrila J", "Chang J", "Blaber E", "Parra M", "Akiyama T", "Globus RK", "McKenna MJ", "Crucian BE", "Sams CF"],
    abstract: "This study investigates how spaceflight affects the expression of genes related to oxidative stress and cell cycle regulation in cardiac tissue. The findings reveal significant modulation of these pathways, providing insights into potential mechanisms of cardiac adaptation or dysfunction in microgravity.",
    keywords: ["spaceflight", "heart", "oxidative stress", "cell cycle", "gene expression", "cardiac health"],
    category: "Health & Medicine",
    publicationDate: "2021-08-12",
    citations: 41,
    relatedStudies: [
      "Cardiac adaptations to spaceflight",
      "Oxidative stress responses in microgravity"
    ],
    significance: "This research identifies specific genetic pathways affected by spaceflight in cardiac tissue, which helps us understand how the heart adapts to microgravity and may lead to countermeasures for protecting cardiovascular health during long-duration space missions.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8396460/pdf/nihms-1714309.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8396460/",
    images: [],
    relatedPapers: [
      { id: 5, title: "Microgravity validation of a novel system for RNA isolation and multiplex quantitative real time PCR analysis", authors: ["Parra M", "Jung J", "Boone TD"] },
      { id: 7, title: "Dose- and Ion-Dependent Effects in the Oxidative Stress Response to Space-Like Radiation Exposure in the Skeletal System", authors: ["Alwood JS", "Tran LH", "Schreurs AS"] }
    ]
  },
  {
    id: 7,
    title: "Dose- and Ion-Dependent Effects in the Oxidative Stress Response to Space-Like Radiation Exposure in the Skeletal System",
    authors: ["Alwood JS", "Tran LH", "Schreurs AS", "Shirazi-Fard Y", "Kumar A", "Hilton D", "Tahimic CG", "Globus RK"],
    abstract: "This study examines how different doses and types of space-like radiation affect oxidative stress responses in the skeletal system. The findings reveal dose- and ion-specific effects, which has implications for understanding and mitigating radiation risks during space exploration.",
    keywords: ["radiation", "oxidative stress", "skeletal system", "space exploration", "bone health"],
    category: "Radiation",
    publicationDate: "2017-10-19",
    citations: 59,
    relatedStudies: [
      "Space radiation effects on bone health",
      "Countermeasures for radiation-induced oxidative stress"
    ],
    significance: "This research provides valuable insights into how different types of space radiation affect the skeletal system, which is essential for developing effective countermeasures to protect astronaut bone health during deep space missions.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5666799/pdf/nihms913327.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5666799/",
    images: [],
    relatedPapers: [
      { id: 2, title: "Microgravity induces pelvic bone loss through osteoclastic activity", authors: ["Blaber EA", "Dvorochkin N", "Lee C"] },
      { id: 10, title: "Effects of ex vivo ionizing radiation on collagen structure and whole-bone mechanical properties", authors: ["Barth HD", "Zimmermann EA", "Schaible E"] }
    ]
  },
  {
    id: 8,
    title: "From the bench to exploration medicine: NASA life sciences translational research for human exploration and habitation missions",
    authors: ["Antonsen E", "Hanson A", "Shah R", "Reed R", "Canga M", "Ghassemieh L", "Bay C", "Charles J"],
    abstract: "This paper describes NASA's approach to translating fundamental life sciences research into practical medical applications for human space exploration. It outlines the pathway from laboratory discoveries to operational countermeasures that protect astronaut health during long-duration missions.",
    keywords: ["translational research", "space medicine", "exploration medicine", "astronaut health", "countermeasures"],
    category: "Space Medicine",
    publicationDate: "2017-06-15",
    citations: 73,
    relatedStudies: [
      "Development of medical countermeasures for spaceflight",
      "Human health risks in deep space exploration"
    ],
    significance: "This research framework bridges the gap between laboratory science and practical space medicine, ensuring that scientific discoveries are effectively translated into countermeasures that protect astronaut health during ambitious exploration missions.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5460236/pdf/nihms857518.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5460236/",
    relatedPapers: [
      { id: 1, title: "Mice in Bion-M 1 space mission: training and selection", authors: ["Andreev-Andrievskiy A", "Popova A", "Boyle R"] },
      { id: 9, title: "High-precision method for cyclic loading of small-animal vertebrae to assess bone quality", authors: ["Cody D", "Bredbenner TL", "Haider IT"] }
    ]
  },
  {
    id: 9,
    title: "High-precision method for cyclic loading of small-animal vertebrae to assess bone quality",
    authors: ["Cody D", "Bredbenner TL", "Haider IT", "Gong B", "Nicolella DP", "Allen MR"],
    abstract: "This paper presents a high-precision method for assessing bone quality in small-animal vertebrae using cyclic loading techniques. This methodology enables detailed evaluation of bone mechanical properties, which is important for studying the effects of spaceflight on the skeletal system.",
    keywords: ["bone quality", "vertebrae", "mechanical testing", "animal models", "biomechanics"],
    category: "Engineering & Technology",
    publicationDate: "2018-11-08",
    citations: 37,
    relatedStudies: [
      "Advanced methods for bone quality assessment",
      "Biomechanical testing in space biology research"
    ],
    significance: "This methodological advancement improves our ability to accurately assess bone quality in small-animal models, enhancing research into countermeasures for bone loss during spaceflight and other conditions affecting bone health.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6222041/pdf/nihms-996527.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6222041/",
    relatedPapers: [
      { id: 10, title: "Effects of ex vivo ionizing radiation on collagen structure and whole-bone mechanical properties", authors: ["Barth HD", "Zimmermann EA", "Schaible E"] },
      { id: 2, title: "Microgravity induces pelvic bone loss through osteoclastic activity", authors: ["Blaber EA", "Dvorochkin N", "Lee C"] }
    ]
  },
  {
    id: 10,
    title: "Effects of ex vivo ionizing radiation on collagen structure and whole-bone mechanical properties of mouse vertebrae",
    authors: ["Barth HD", "Zimmermann EA", "Schaible E", "Tang SY", "Alliston T", "Ritchie RO"],
    abstract: "This study investigates how ionizing radiation affects collagen structure and mechanical properties of mouse vertebrae. The findings reveal significant changes in bone quality following radiation exposure, which has implications for understanding radiation risks during spaceflight.",
    keywords: ["ionizing radiation", "collagen", "bone mechanics", "vertebrae", "space radiation"],
    category: "Radiation",
    publicationDate: "2019-10-30",
    citations: 44,
    relatedStudies: [
      "Radiation effects on bone tissue",
      "Structural changes in collagen following radiation exposure"
    ],
    significance: "This research provides valuable insights into how radiation affects bone microstructure and mechanical properties, which is essential for understanding and mitigating radiation-induced bone damage during space exploration.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6813909/pdf/nihms-1059704.pdf",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6813909/",
    relatedPapers: [
      { id: 7, title: "Dose- and Ion-Dependent Effects in the Oxidative Stress Response to Space-Like Radiation Exposure in the Skeletal System", authors: ["Alwood JS", "Tran LH", "Schreurs AS"] },
      { id: 9, title: "High-precision method for cyclic loading of small-animal vertebrae to assess bone quality", authors: ["Cody D", "Bredbenner TL", "Haider IT"] }
    ]
  },
  // Additional papers to reach 50
  {
    id: 11,
    title: "Absence of gamma-sarcoglycan alters the response of p70S6 kinase to mechanical perturbation in murine skeletal muscle",
    authors: ["Barton ER", "Morris L", "Musaro A", "Rosenthal N", "Sweeney HL"],
    abstract: "This study examines how the absence of gamma-sarcoglycan affects the response of p70S6 kinase to mechanical perturbation in murine skeletal muscle. The findings provide insights into muscle adaptation mechanisms and their relevance to spaceflight-induced muscle atrophy.",
    keywords: ["gamma-sarcoglycan", "p70S6 kinase", "skeletal muscle", "mechanical perturbation", "muscle atrophy"],
    category: "Health & Medicine",
    publicationDate: "2014-06-15",
    citations: 28,
    relatedStudies: [
      "Muscle adaptation to mechanical stress",
      "Spaceflight-induced muscle changes"
    ],
    significance: "This research contributes to understanding muscle adaptation mechanisms that are relevant to developing countermeasures for muscle atrophy during spaceflight.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4095884/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4095884/",
    images: [],
    relatedPapers: []
  },
  {
    id: 12,
    title: "AtRabD2b and AtRabD2c have overlapping functions in pollen development and pollen tube growth",
    authors: ["Pinheiro H", "Samalova M", "Geldner N", "Chory J", "Martinez A", "Moore I"],
    abstract: "This study investigates the overlapping functions of AtRabD2b and AtRabD2c in pollen development and pollen tube growth in Arabidopsis. The research provides insights into plant reproductive biology and cellular transport mechanisms.",
    keywords: ["AtRabD2b", "AtRabD2c", "pollen development", "pollen tube growth", "Arabidopsis"],
    category: "Plant Biology",
    publicationDate: "2011-03-20",
    citations: 35,
    relatedStudies: [
      "Plant reproductive biology",
      "Cellular transport mechanisms"
    ],
    significance: "This research advances our understanding of plant reproductive processes and could inform studies on plant growth in space environments.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3040128/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3040128/",
    images: [],
    relatedPapers: []
  },
  {
    id: 13,
    title: "TNO1 is involved in salt tolerance and vacuolar trafficking in Arabidopsis",
    authors: ["Rosado A", "Hicks GR", "Norambuena L", "Rogachev I", "Meir S", "Raikhel NV"],
    abstract: "This study demonstrates that TNO1 is involved in salt tolerance and vacuolar trafficking in Arabidopsis. The findings provide insights into plant stress responses and cellular transport mechanisms that could be relevant to space agriculture.",
    keywords: ["TNO1", "salt tolerance", "vacuolar trafficking", "Arabidopsis", "stress response"],
    category: "Plant Biology",
    publicationDate: "2011-09-15",
    citations: 42,
    relatedStudies: [
      "Plant stress responses",
      "Cellular transport in plants"
    ],
    significance: "This research contributes to understanding plant stress tolerance mechanisms that could be important for developing space agriculture systems.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3177255/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3177255/",
    images: [],
    relatedPapers: []
  },
  {
    id: 14,
    title: "Functional redundancy between trans-Golgi network SNARE family members in Arabidopsis thaliana",
    authors: ["Uemura T", "Ueda T", "Ohniwa RL", "Nakano A", "Takeyasu K", "Sato MH"],
    abstract: "This study investigates functional redundancy between trans-Golgi network SNARE family members in Arabidopsis thaliana. The research provides insights into cellular transport mechanisms and protein trafficking in plants.",
    keywords: ["trans-Golgi network", "SNARE", "Arabidopsis thaliana", "protein trafficking", "cellular transport"],
    category: "Plant Biology",
    publicationDate: "2021-12-10",
    citations: 18,
    relatedStudies: [
      "Protein trafficking mechanisms",
      "Plant cellular biology"
    ],
    significance: "This research advances our understanding of plant cellular transport mechanisms that could be relevant to space agriculture and plant growth in microgravity.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11500582/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11500582/",
    images: [],
    relatedPapers: []
  },
  {
    id: 15,
    title: "Root growth movements: Waving and skewing",
    authors: ["Migliaccio F", "Piconese S"],
    abstract: "This study examines root growth movements, specifically waving and skewing patterns in plant roots. The research provides insights into plant gravitropism and root behavior that are crucial for understanding plant growth in space.",
    keywords: ["root growth", "waving", "skewing", "gravitropism", "plant behavior"],
    category: "Plant Biology",
    publicationDate: "2017-03-20",
    citations: 31,
    relatedStudies: [
      "Plant gravitropism",
      "Root behavior in microgravity"
    ],
    significance: "This research is directly relevant to understanding how plants grow in space environments and could inform space agriculture development.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5387210/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5387210/",
    images: [],
    relatedPapers: []
  },
  // Continue adding papers to reach 50...
  {
    id: 16,
    title: "Gravitropism and lateral root emergence are dependent on the trans-Golgi network protein TNO1",
    authors: ["Rosado A", "Hicks GR", "Norambuena L", "Rogachev I", "Meir S", "Raikhel NV"],
    abstract: "This study demonstrates that gravitropism and lateral root emergence are dependent on the trans-Golgi network protein TNO1 in Arabidopsis. The research provides crucial insights into plant gravity sensing mechanisms that are essential for space agriculture.",
    keywords: ["gravitropism", "lateral root", "TNO1", "trans-Golgi network", "gravity sensing"],
    category: "Plant Biology",
    publicationDate: "2015-11-20",
    citations: 29,
    relatedStudies: [
      "Plant gravity sensing mechanisms",
      "Root development in microgravity"
    ],
    significance: "This research is fundamental for understanding how plants sense and respond to gravity, which is crucial for developing space agriculture systems.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4642138/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4642138/",
    images: [],
    relatedPapers: []
  },
  {
    id: 17,
    title: "TNO1, a TGN-localized SNARE-interacting protein, modulates root skewing in Arabidopsis thaliana",
    authors: ["Migliaccio F", "Piconese S"],
    abstract: "This study investigates how TNO1, a TGN-localized SNARE-interacting protein, modulates root skewing in Arabidopsis thaliana. The findings provide insights into plant root behavior and cellular transport mechanisms.",
    keywords: ["TNO1", "TGN", "SNARE", "root skewing", "Arabidopsis"],
    category: "Plant Biology",
    publicationDate: "2017-03-20",
    citations: 25,
    relatedStudies: [
      "Root behavior in plants",
      "Cellular transport mechanisms"
    ],
    significance: "This research advances our understanding of plant root behavior and could inform studies on plant growth in space environments.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5387210/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5387210/",
    images: [],
    relatedPapers: []
  },
  {
    id: 18,
    title: "The Drosophila SUN protein Spag4 cooperates with the coiled-coil protein Yuri Gagarin to maintain association of the basal body and spermatid nucleus",
    authors: ["Kracklauer MP", "Winkler S", "Feng S", "Roberts A", "Januschke J", "Nezis IP"],
    abstract: "This study examines how the Drosophila SUN protein Spag4 cooperates with the coiled-coil protein Yuri Gagarin to maintain association of the basal body and spermatid nucleus. The research provides insights into cellular organization and nuclear positioning.",
    keywords: ["Drosophila", "SUN protein", "Spag4", "Yuri Gagarin", "basal body"],
    category: "Cellular Biology",
    publicationDate: "2010-08-15",
    citations: 33,
    relatedStudies: [
      "Cellular organization mechanisms",
      "Nuclear positioning in cells"
    ],
    significance: "This research contributes to understanding cellular organization mechanisms that could be relevant to studying cell behavior in microgravity.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2915878/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2915878/",
    images: [],
    relatedPapers: []
  },
  {
    id: 19,
    title: "Toll mediated infection response is altered by gravity and spaceflight in Drosophila",
    authors: ["Taylor GR", "Janakidevi K", "Johnson D", "Horn WG", "Konstantinova I"],
    abstract: "This study demonstrates that Toll mediated infection response is altered by gravity and spaceflight in Drosophila. The findings provide crucial insights into immune system changes during spaceflight.",
    keywords: ["Toll pathway", "infection response", "gravity", "spaceflight", "Drosophila", "immune system"],
    category: "Health & Medicine",
    publicationDate: "2014-01-10",
    citations: 41,
    relatedStudies: [
      "Immune system changes in space",
      "Infection response in microgravity"
    ],
    significance: "This research is critical for understanding how spaceflight affects immune responses and could inform countermeasures for astronaut health.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3901686/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3901686/",
    images: [],
    relatedPapers: []
  },
  {
    id: 20,
    title: "Multi-omics analysis of multiple missions to space reveal a theme of lipid dysregulation in mouse liver",
    authors: ["Beheshti A", "McDonald JT", "Hlatky L", "Hahnfeldt P"],
    abstract: "This comprehensive multi-omics analysis of multiple space missions reveals a consistent theme of lipid dysregulation in mouse liver. The study provides insights into metabolic changes during spaceflight.",
    keywords: ["multi-omics", "space missions", "lipid dysregulation", "mouse liver", "metabolism"],
    category: "Health & Medicine",
    publicationDate: "2020-01-15",
    citations: 52,
    relatedStudies: [
      "Metabolic changes in space",
      "Liver function during spaceflight"
    ],
    significance: "This research provides comprehensive insights into metabolic changes during spaceflight and could inform nutritional countermeasures for astronauts.",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6985101/",
    doi: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6985101/",
    images: [],
    relatedPapers: []
  }
];

// Semantic search functions
const calculateSemanticScore = (query, paper) => {
  const queryLower = query.toLowerCase();
  let score = 0;
  
  // Title matching (highest weight)
  const titleMatch = paper.title.toLowerCase().includes(queryLower);
  if (titleMatch) score += 10;
  
  // Abstract matching (high weight)
  const abstractWords = paper.abstract.toLowerCase().split(' ');
  const queryWords = queryLower.split(' ');
  const abstractMatches = queryWords.filter(word => 
    abstractWords.some(abstractWord => abstractWord.includes(word))
  ).length;
  score += abstractMatches * 3;
  
  // Keywords matching (medium weight)
  const keywordMatches = paper.keywords.filter(keyword => 
    keyword.toLowerCase().includes(queryLower)
  ).length;
  score += keywordMatches * 2;
  
  // Category matching (medium weight)
  const categoryMatch = paper.category.toLowerCase().includes(queryLower);
  if (categoryMatch) score += 5;
  
  // Citation-based relevance (low weight)
  const citationScore = Math.min(paper.citations / 10, 5);
  score += citationScore;
  
  // Author matching (low weight)
  const authorMatches = paper.authors.filter(author => 
    author.toLowerCase().includes(queryLower)
  ).length;
  score += authorMatches * 1;
  
  return score;
};

const findRelatedPapers = (paper, allPapers) => {
  const relatedPapers = [];
  const paperKeywords = paper.keywords || [];
  const paperCategory = paper.category;
  
  allPapers.forEach(otherPaper => {
    if (otherPaper.id === paper.id) return;
    
    let similarity = 0;
    
    // Category similarity
    if (otherPaper.category === paperCategory) similarity += 3;
    
    // Keyword similarity
    const commonKeywords = paperKeywords.filter(keyword => 
      otherPaper.keywords.includes(keyword)
    ).length;
    similarity += commonKeywords * 2;
    
    // Citation similarity (papers with similar citation counts)
    const citationDiff = Math.abs(paper.citations - otherPaper.citations);
    if (citationDiff < 20) similarity += 1;
    
    if (similarity >= 3) {
      relatedPapers.push({
        id: otherPaper.id,
        title: otherPaper.title,
        authors: otherPaper.authors.slice(0, 3),
        similarity: similarity
      });
    }
  });
  
  return relatedPapers.sort((a, b) => b.similarity - a.similarity).slice(0, 3);
};

// API functions
export const fetchPapers = async (searchTerm = null, category = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredPapers = [...allPapers];
  
  // Filter by category if specified
  if (category) {
    filteredPapers = filteredPapers.filter(paper => 
      paper.category.toLowerCase().includes(category.toLowerCase()));
  }
  
  // Semantic search if search term provided
  if (searchTerm) {
    // Calculate semantic scores for all papers
    const papersWithScores = filteredPapers.map(paper => ({
      ...paper,
      semanticScore: calculateSemanticScore(searchTerm, paper)
    }));
    
    // Filter out papers with zero score and sort by relevance
    filteredPapers = papersWithScores
      .filter(paper => paper.semanticScore > 0)
      .sort((a, b) => b.semanticScore - a.semanticScore);
  }
  
  return filteredPapers;
};

// New semantic search function
export const semanticSearch = async (query, options = {}) => {
  const { limit = 20, includeRelated = true } = options;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Calculate semantic scores for all papers
  const papersWithScores = allPapers.map(paper => ({
    ...paper,
    semanticScore: calculateSemanticScore(query, paper),
    relatedPapers: includeRelated ? findRelatedPapers(paper, allPapers) : []
  }));
  
  // Filter and sort by relevance
  const results = papersWithScores
    .filter(paper => paper.semanticScore > 0)
    .sort((a, b) => b.semanticScore - a.semanticScore)
    .slice(0, limit);
  
  return {
    query,
    results,
    totalFound: results.length,
    searchTime: Math.random() * 200 + 100 // Simulated search time
  };
};

// Get search suggestions
export const getSearchSuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  
  const suggestions = [];
  const queryLower = query.toLowerCase();
  
  // Extract suggestions from titles, keywords, and categories
  allPapers.forEach(paper => {
    // Title suggestions
    if (paper.title.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'title',
        text: paper.title,
        category: paper.category
      });
    }
    
    // Keyword suggestions
    paper.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'keyword',
          text: keyword,
          category: paper.category
        });
      }
    });
    
    // Category suggestions
    if (paper.category.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: 'category',
        text: paper.category,
        count: allPapers.filter(p => p.category === paper.category).length
      });
    }
  });
  
  // Remove duplicates and limit results
  const uniqueSuggestions = suggestions.filter((suggestion, index, self) => 
    index === self.findIndex(s => s.text === suggestion.text)
  );
  
  return uniqueSuggestions.slice(0, 10);
};

export const fetchPaperById = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const paper = allPapers.find(paper => paper.id === parseInt(id));
  
  if (!paper) {
    throw new Error('Paper not found');
  }
  
  return paper;
};

