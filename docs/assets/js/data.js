/* All portfolio content lives here. Copy rules (from the print portfolio): no em dashes, use a hyphen or a middle dot.
   Images are referenced by slug: media/<slug>-640.webp and media/<slug>-1600.webp (sizes in media.js).
   Gallery entry: ['slug', 'caption', {wide:true, contain:true}] - the first entry is the hero. */
window.PORTFOLIO = {
  featureSlug: 'kuppam-gpr',
  feature: {"video": {"src": "media/video/kuppam-film-720.mp4", "poster": "media/video/kuppam-film-poster.webp", "label": "Kuppam GPR film, 90 seconds, captions on screen", "cap": "The 90 s film made for LinkedIn · captions on screen · music: “A New Life”, Eugenio Mininni (Mixkit)"}, "iframe": "https://libishm1.github.io/Kuppam_granite-deposit_GPR-Fracture_study/", "iframePoster": "kuppam-viewer"},

  // LinkedIn: paste the post URL into `post`. For an inline embed, use LinkedIn's "Embed this post" code
  // and copy only the iframe src, e.g. https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:1234567890
  linkedin: { post: '', embed: '' },

  ticker: ['Robotic fabrication', 'Scan-to-fabricate', 'Ground-penetrating radar', 'Photogrammetry', 'Stone packing', 'Rubble vaults', 'ROS 2 · MoveIt 2', 'UR10e · KUKA · ABB', 'Rhino 8 · Grasshopper', 'Open3D', 'Heritage reconstruction', 'Non-planar printing', 'Auxetic metal', 'IFC · BIM software'],

  stats: [
    { v: '11', k: 'years of work · 2016 - 2026' },
    { v: '27', k: 'projects and studies on this page' },
    { v: '275', k: 'Frahan StonePack components' },
    { v: '14,315', k: 'GPR picks · Kuppam pilot' },
  ],

  sections: [
    { id: 'A', chip: 'Robotic fabrication', title: 'Robotic Fabrication & Material Computation', short: 'Spolia · timber · metal · lattice · Möbius', bg: '#15142C',
      blurb: 'Pine offcuts, irregular logs, stone salvaged from demolition, aluminium sheet and clay. None of it comes in standard sizes; these projects build the perception, geometry and motion systems that let a robot work with it anyway.' },
    { id: 'B', chip: 'Sensing & heritage', title: 'Sensing, Reconstruction & Heritage', short: 'GPR · photogrammetry · depth · thermal', bg: '#1B2A33',
      blurb: 'Radar under a quarry floor, a drone arc over stone labyrinths, one photograph of a temple relief, thermal cameras on a mobile robot: sensing turned toward stone, quarries and cultural heritage. Much of it is open, with datasets.' },
    { id: 'C', chip: 'Tools & software', title: 'Computational Tools & Software', short: 'Frahan · IFC · robotics · fabrication', bg: '#262433',
      blurb: 'Research made into tools other people can open, install or rebuild: a stone-fabrication plugin for Grasshopper, IFC analysis in the browser, a robot stack that rebuilds from one Docker image, and a pointing machine for carvers.' },
    { id: 'D', chip: 'Architecture & studio', title: 'Architecture, Site & Studio Work', short: 'terrain · pavilions · housing · studios', bg: '#2A1F1A',
      blurb: 'Professional site work, pavilions, housing and academic studios, with the computation close to the ground: roads graded on a slope, a metal canopy finished by hammering, bamboo tied with rope knots, housing shaped by sun and sightlines.' },
  ],

  extraContents: [
    { href: '#lab', tag: '3D', title: '3D Lab', sub: 'rubble vaults and masonry you can turn and take apart', n: 'interactive' },
    { href: '#publications', tag: '§', title: 'Publications', sub: 'papers, preprints and datasets with DOIs', n: '' },
    { href: '#archive', tag: '↺', title: 'Archive', sub: 'the 2016 - 2024 portfolio, 23 plates', n: '23 plates' },
  ],

  projects: [
    // ================= A · Robotic Fabrication =================
    { slug: 'automated-spolia', section: 'A', year: '2023', feature: true, robot: true,
      kicker: 'Individual graduate thesis · MRAC, IAAC Barcelona', title: 'Automated Spolia', sub: 'Perception-assisted robotic placement of salvaged demolition stone',
      meta: ['2023', 'Robotic perception', 'Thesis'],
      lead: 'A robot sees each shard of demolition stone, plans where it fits and places it.',
      body: 'The substrate is irregular and so is every shard. A depth camera scans the surface, and the noisy mesh is cleaned through Taubin smoothing, downsampling and Poisson sampling; a digital twin carries it into the robot cell, where a packing engine picks each shard and turns it to fit by shape, size and surface curvature.\nThe aim is not explicit machine intelligence but a loop people can steer: offline and semi-real-time robotic workflows for digital artists, with visual perception and force-torque feedback settling each stone into place.',
      contrib: ['Scan-to-design database and the design algorithm that packs shards in 2D and 3D by shape, size and curvature', 'Robotic perception: depth-scan mesh processing, digital twin and Open3D shard segmentation', 'Manipulation framework: collision-checked motion planning (Pilz) and servo placement with force-torque feedback'],
      tags: ['Open3D', 'UR10e', 'ROS', 'Grasshopper', 'Packing'], links: [],
      credits: 'Individual thesis project (MRAC02, IAAC Barcelona), developed with guidance from IAAC faculty.',
      steps: { title: 'Geometry pipeline · scan to packed surface', items: [
        ['old-spolia-substrate', 'Noisy depth scan'], ['old-spolia-mesh-points', 'Taubin + Poisson sampling'], ['old-spolia-mesh-tri', 'Downsampled mesh'], ['old-spolia-mesh-normals', 'Face normals'], ['old-spolia-twin-pack', 'Curvature-aware packing'] ] },
      images: [
        ['old-spolia-ur-wide', 'UR arm placing salvaged shards onto the scanned substrate'],
        ['old-spolia-twin-pack', 'Digital twin with packing: shards placed by shape, size and surface curvature', { wide: true }],
        ['old-spolia-motion-plan', 'Collision-aware motion planning: every shard pose becomes a robot target'],
        ['old-spolia-ur-real', 'Servo real-time placement with force-torque feedback'],
        ['old-spolia-sim', 'Digital twin of the UR cell'],
        ['old-spolia-packed-render', 'Packed shard surface'],
        ['old-spolia-seg', 'Open3D segmentation of shards on the table', { wide: true }],
        ['old-spolia-poses', 'Shard poses for grasping'],
        ['old-spolia-ur-right', 'UR arm over the packed tray'],
        ['old-spolia-toolpath', 'Non-planar overprint toolpath for gluing'],
        ['old-spolia-clay-print', 'Non-planar overprint'],
        ['old-spolia-substrate', 'Noisy mesh from the depth camera'],
        ['old-spolia-mesh-points', 'Taubin smoothing and Poisson sampling'],
        ['old-spolia-mesh-tri', 'Mesh downsampling'],
        ['old-spolia-mesh-normals', 'Face-normal computation'],
      ] },

    { slug: 'cclt', section: 'A', year: '2022', robot: true,
      kicker: 'Studio 3 · MRAC', title: 'CCLT · Curved Cross-Laminated Timber', sub: 'Recycling wood offcuts into bespoke double-curved panels',
      meta: ['2022', 'Material computation', 'Robotic CNC'],
      lead: 'Rough pine offcuts from wood manufacturing, laminated to shape themselves into double-curved panels.',
      body: 'The work starts from the material and what its manufacture allows. A laminated panel bends as its moisture changes; the project asks how far that self-shaping and curve-creasing patterns can be steered toward explicit target geometry.\nMachine-learning pipelines help select curvatures across segmented panels, narrowing a wide material design space to a usable design algorithm, and robot calibration carries it to fabrication.',
      contrib: ['Material-to-design research on self-shaping pine offcuts (moisture, thickness, deflection)', 'Wood working, scanning and ML curvature prediction for the segmented panels', 'Robot calibration for the KUKA milling of the laminated panels'],
      tags: ['Self-shaping wood', 'ML', 'Robot calibration', 'Grasshopper'], links: [{ label: 'IAAC blog', url: 'https://www.iaacblog.com/programs/curved-cross-laminated-timber/' }],
      credits: 'Team: Robert Michael Blackburn, Libish Murugesan, İpek Attaroğlu, Jordi Vilanova · Faculty: Alexandre Dubor, Marielena Papandreou · MRAC01 Studio III, 2021/22 · KUKA KR150.',
      images: [
        ['d-cclt-arch-v2', 'Creased double-curvature arch from segmented panels', { wide: true }],
        ['old-cclt-robot-mill-a', 'Robotic milling of a laminated panel'],
        ['old-cclt-robot-mill-b', 'Robotic milling close-up'],
        ['old-cclt-deflection', 'Self-shaping deflection study across six panels'],
        ['old-cclt-offcuts', 'Pine offcuts as the raw material'],
        ['old-cclt-arch', 'Extrapolation on double curvature using curve-creasing patterns'],
      ] },

    { slug: 'log-pavilion', section: 'A', year: '2022-23', robot: true,
      kicker: 'Robotic fabrication workshop · MRAC02 · team', title: 'Log Pavilion', sub: 'Scan-to-fabricate pavilion from irregular wooden logs',
      meta: ['2022-23', 'Scan-to-fabricate', 'Pavilion'],
      lead: 'No two logs match: each is scanned, and a geometry pipeline automates design and planning.',
      body: 'The pavilion is built from irregular wooden logs. Each scan goes into a database that records the log’s end diameters, planes and overall length, and a design-to-fabrication algorithm works out the joinery: how each log is oriented and where its joints are generated.\nThe same scans carry the work from raw log to processing and assembly. Arranging them computationally is what matches the detail at every joint.',
      contrib: ['Coordinated the scan-to-design database of the logs (end diameters, planes, length)', 'Design algorithm matching scanned logs to target curves and resolving joinery', 'Design-to-fabrication automation for the robotic milling'],
      tags: ['3D scanning', 'Point cloud', 'Grasshopper', 'Joinery'], links: [],
      credits: 'Group project · MAA02 & MRAC02 22/23 Robotic Fabrication, IAAC · Faculty: Alexandre Dubor, Marielena Papandreou.',
      images: [
        ['old-log-robot', 'KUKA arm processing a scanned log'],
        ['old-log-scan', 'Log scanned on its reference jig'],
        ['old-log-bench', 'Resolved bench from matched logs'],
        ['old-log-column', 'Log column with top, middle and footing joinery'],
      ] },

    { slug: 'crease-forming', section: 'A', year: '2022', robot: true,
      kicker: 'Studio 1 · MRAC · eCAADe 2022', title: 'Crease Forming', sub: '“Programming Twist” - origami-inspired robotic metal forming',
      meta: ['2022', 'Published · eCAADe', 'Sheet metal'],
      lead: 'A robot feeds aluminium strip under a wheel cutter; the creases fold it into a twist.',
      body: 'The forming borrows from traditional metal-working, and each design is iterated first through origami folding and rapid physics simulation. The small workshop hydraulic press, its wheel cutter and the robot that feeds it make an automated pipeline from design to production.\nA small-payload robot is enough for a wide range of shapes. Spring-back and elastic/plastic deformation are documented as fabrication parameters, not treated as noise.',
      contrib: ['Main ideation behind the creasing method, developed with the four-person studio team', 'Robot-fed hydraulic-press creasing cell, from design to production', 'Spring-back and plastic deformation documented in the eCAADe 2022 paper (co-author)'],
      tags: ['Aluminium', 'Origami', 'Physics sim', 'Robotic forming'], links: [{ label: 'Paper · eCAADe 2022', url: 'https://doi.org/10.52842/conf.ecaade.2022.2.399' }],
      credits: 'Studio team of four (MRAC01 Studio I, 2021): Beril Serbes, Robert Michael Blackburn, Libish Murugesan, Arpan Mathe · Faculty: Raimund Krenmueller, Marielena Papandreou, Luciano Carizza · ABB IRB 140 · Paper: Papandreou, Baseta, Mathe, Blackburn, Murugesan · eCAADe 2022, Ghent, Vol. 2, pp. 399-408.',
      images: [
        ['old-crease-robot-sheet', 'ABB arm feeding aluminium sheet into the forming station'],
        ['old-crease-twists', 'Crease-formed twist demonstrator'],
        ['old-crease-robot-press', 'Robot and hydraulic-press cell with a wheel cutter', { wide: true }],
        ['old-crease-surfaces', 'Extrapolations on double curvature using curve-creasing patterns', { wide: true, contain: true }],
        ['dx-page-05-3', 'Crease-pattern surface study'],
        ['dx-page-05-5', 'Double-curved crease surface'],
      ] },

    { slug: 'lattice-printing', section: 'A', year: '2021', robot: true,
      kicker: 'Workshop 1.2 · MRAC01, first semester', title: 'Non-planar Lattice 3D Printing', sub: 'Space-frame lattices printed on a robotic arm',
      meta: ['2021', 'Non-planar AM', 'Robotic arm'],
      lead: 'In a non-planar lattice, every apex must cool just long enough to hold itself up.',
      body: 'A robotic arm prints non-planar space-frame lattices in PLA. The hardest part is the apex of the pyramidal module, where the extruder has to stop, wait and cool: too long and the plastic sticks to the tip and drags, too short and it is too soft to support itself.\nDeviations across the 0.5 m span showed up when the upper row was printed, and the team worked to correct them; the result is a repeatable lattice module.',
      contrib: ['Non-planar toolpathing for space-frame lattices', 'Apex stop/cool timing strategy for clean nodes', 'Correcting deviations across the 0.5 m span'],
      tags: ['Non-planar AM', 'PLA', 'Robotic arm', 'Toolpathing'], links: [],
      images: [
        ['old-lattice-module', 'The repeatable lattice module'],
        ['old-lattice-apex', 'Printing the apex of the pyramid (16x speed)'],
        ['old-lattice-layer', 'Printing the second layer of the lattice'],
        ['old-lattice-span', 'The space-frame prototype, 0.5 m span', { wide: true }],
        
      ] },

    { slug: 'mobius', section: 'A', year: '2023-24', robot: true,
      kicker: 'Project Associate II · IISc Bangalore', title: 'Robotic Views of a Möbius Strip', sub: 'Stereo reconstruction with a robot-mounted camera',
      meta: ['2023-24', 'Computer vision', 'IISc'],
      lead: 'A robot carries a stereo camera around a Möbius strip in controlled, repeatable poses.',
      body: 'Markers cover the strip. The stereo camera, mounted on the arm, sees each marker from many views, and multiple-view geometry triangulates it.\nThe experimental work tests and benchmarks computer-vision algorithms for recovering surfaces, with a software pipeline that extracts the robot poses and camera position for reconstruction.',
      contrib: ['Robot-driven multi-view stereo capture', 'Marker triangulation across a non-orientable surface', 'Pose-extraction pipeline for reconstruction'],
      tags: ['Stereo', 'Multi-view geometry', 'OpenCV', 'Robotics'], links: [],
      compare: { title: 'Physical strip vs triangulated markers', a: 'old-mobius-a', al: 'Marker strip', b: 'old-mobius-points', bl: 'Triangulated', ratio: '16 / 10' },
      images: [
        ['old-mobius-a', 'Marker-patterned Möbius strip'],
        ['old-mobius-robot-sim', 'KUKA stereo-capture simulation with the camera rig'],
        ['old-mobius-robot-poses', 'Robot capture poses around the strip'],
        ['old-mobius-points', 'Triangulated marker cloud'],
        ['old-mobius-b', 'The strip from a second view'],
      ] },

    // ================= B · Sensing & Heritage =================
    {
      "slug": "kuppam-gpr",
      "section": "B",
      "year": "2026",
      "feature": true,
      "isNew": true,
      "video": true,
      "kicker": "New · Independent pilot · open research",
      "title": "Kuppam GPR Fracture Study",
      "sub": "From ground-penetrating radar to a straight-cut block plan in a black granite quarry",
      "meta": [
        "Near Kuppam, Andhra Pradesh",
        "Aug-Sep 2026 · three benches",
        "GPL-3.0 · dataset DOI"
      ],
      "lead": "One crack in the wrong place turns a twenty-tonne block into road metal, so look under the floor before the first cut.",
      "body": "In August 2026 I commissioned an independent pilot: ground-penetrating radar over three benches of a black granite (dolerite) quarry near Kuppam, 89 lines walked by PARSAN Overseas with two antennas on a painted 0.5 m grid.\nI re-tracked six fracture surfaces from the raw records (14,315 picks), registered them onto photogrammetry of the same benches, and planned straight wire cuts that keep 15 cm clear of every surface: 42 blocks, 177 m³, 524 t, and 113 pieces not worth cutting, known before the first cut. Model, code and dataset are open under GPL-3.0. Have a look, and tell me where it is wrong.",
      "contrib": [
        "Re-picked six fracture surfaces from the raw radar records, most seeded from PARSAN’s picks: 14,315 picks, a crossing-line adjustment on the deep cap, and an uncertainty band on every surface.",
        "Registered each survey grid onto photogrammetry of its bench from the painted 0.5 m grid alone, and checked it by drawing the model back into the site photographs.",
        "Wrote the straight-cut block planner (15 cm clearance, cutting order, Monte Carlo risk per block) and the bilingual browser viewer for mason, owner and geologist."
      ],
      "tags": [
        "Ground-penetrating radar",
        "Photogrammetry",
        "Python",
        "Three.js",
        "Block planning",
        "Uncertainty"
      ],
      "links": [
        {
          "label": "Live 3D model",
          "url": "https://libishm1.github.io/Kuppam_granite-deposit_GPR-Fracture_study/"
        },
        {
          "label": "Pit view",
          "url": "https://libishm1.github.io/Kuppam_granite-deposit_GPR-Fracture_study/site.html"
        },
        {
          "label": "Dataset DOI",
          "url": "https://doi.org/10.6084/m9.figshare.33690616"
        },
        {
          "label": "Code",
          "url": "https://github.com/libishm1/Kuppam_granite-deposit_GPR-Fracture_study"
        },
        {
          "label": "Method preprint",
          "url": "https://doi.org/10.21203/rs.3.rs-10035624/v1"
        }
      ],
      "metrics": [
        {
          "v": "89",
          "k": "GPR lines"
        },
        {
          "v": "14,315",
          "k": "radar picks re-tracked"
        },
        {
          "v": "6",
          "k": "fracture surfaces"
        },
        {
          "v": "42",
          "k": "blocks · 177 m³"
        }
      ],
      "credits": "Survey, velocity calibration and first interpretation: PARSAN Overseas (Dr Sanjay Rana, Ronak Dahiya) · Re-picking (most surfaces seeded from PARSAN’s picks), model and plan: Libish Murugesan · With thanks to the crew who painted the grid and walked every line",
      "cover": "kuppam-blocks",
      "steps": {
        "title": "From radar line to cut plan",
        "items": [
          [
            "kuppam-bench-lines",
            "89 lines walked"
          ],
          [
            "kuppam-radargram",
            "One section, picked"
          ],
          [
            "kuppam-picks-in-pit",
            "Picks stood up"
          ],
          [
            "kuppam-six-surfaces",
            "Six fracture surfaces"
          ],
          [
            "kuppam-blocks",
            "Blocks between cracks"
          ],
          [
            "kuppam-wire-cuts",
            "164 straight cuts"
          ]
        ]
      },
      "images": [
        [
          "kuppam-viewer",
          "The live viewer: the photographed bench on its painted grid, the radar surfaces, and one raw line with its picks. Roles for mason, owner and geologist, in English or Tamil.",
          {
            "title": "The bench model in the browser",
            "wide": true
          }
        ],
        [
          "kuppam-bench-lines",
          "Every radar line walked, drawn on the photogrammetry of the three benches: 89 lines, 612 m, two antennas, a trace every 2.5 cm. Frame from the film.",
          {
            "title": "89 lines on three benches"
          }
        ],
        [
          "kuppam-radargram",
          "Block C, line 20, low-frequency antenna: a shallow sheet (C-1) near the surface and a flat cap about three metres down (C-2), picked trace by trace. Frame from the film.",
          {
            "title": "One section, as recorded"
          }
        ],
        [
          "kuppam-picks-in-pit",
          "The deep cap under Block C, picked on all 32 lines that cross it (9,481 picks) and stood up where it was recorded. Frame from the film.",
          {
            "title": "One surface from 32 lines"
          }
        ],
        [
          "kuppam-six-surfaces",
          "The six radar surfaces under the three benches, from 0.2 m to about 4 m deep; depth error runs from 8 cm on the shallow sheets to 22 cm on the deep ones. Frame from the film.",
          {
            "title": "Six fracture surfaces"
          }
        ],
        [
          "kuppam-blocks",
          "Candidate blocks placed where the surfaces are not, each kept 15 cm clear of every surface above and below it. Frame from the film.",
          {
            "title": "Blocks between the cracks"
          }
        ],
        [
          "kuppam-wire-cuts",
          "A diamond wire cuts one straight plane at a time, so the plan uses straight through-cuts only: 164 of them, in cutting order, across the three benches. Frame from the film.",
          {
            "title": "164 straight cuts"
          }
        ],
        [
          "kuppam-registration",
          "Block B in plan on its photogrammetry, with the survey grid (yellow) and the depth contours of both surfaces. No markers or GPS: the painted 0.5 m grid gave scale, rotation and position.",
          {
            "title": "Registered onto photogrammetry"
          }
        ],
        [
          "kuppam-reprojection",
          "The registered grid and the crew's chalked cracks drawn back into a site photograph of Block C, the check every registration had to pass.",
          {
            "title": "Checked against the photographs"
          }
        ],
        [
          "kuppam-stereonet",
          "Poles to the six picked surfaces, equal-area lower hemisphere: near-flat sheets on B and C, the two A sheets dipping about 30 degrees to the south.",
          {
            "title": "Which way they lean",
            "wide": true,
            "contain": true
          }
        ]
      ]
    },

    { slug: 'drone-labyrinths', section: 'B', year: '2025',
      kicker: 'Independent research · Caerdroia 54 and 55', title: 'Drone Photogrammetry of Stone Labyrinths', sub: 'Full-arc drone video to textured mesh - Salem, Tamil Nadu',
      meta: ['2025', 'Photogrammetry', 'Heritage'],
      lead: 'An open-source pipeline turns one arc of drone video into a textured mesh you can print.',
      body: 'The Ezhu Suthu Kottai, two large stone labyrinths at Vembadithalam near Salem, are said in local accounts to be more than a thousand years old. The workflow is fully open-source and runs end to end in Google Colab: FFmpeg frame extraction, COLMAP structure-from-motion and dense stereo, then Open3D Poisson meshing with nearest-neighbour colour transfer.\nOutputs are vertex-coloured PLY meshes and 3D-printable STL derivatives, cleaned in Rhino 8. Transparency and reproducibility come before speed.',
      contrib: ['Reproducible Colab pipeline: FFmpeg → COLMAP → Open3D', 'Textured PLY + print-ready STL for heritage documentation', 'Two Caerdroia articles: the labyrinths (54, 2025) and the drone-to-3D-model workflow (55, 2026)'],
      tags: ['COLMAP', 'Open3D', 'FFmpeg', 'Rhino 8'], links: [{ label: 'Caerdroia 54 (PDF)', url: 'https://labyrinthos.net/Caerdroia54HR.pdf' }, { label: 'Caerdroia 55 (PDF)', url: 'https://labyrinthos.net/Caerdroia55HR.pdf' }, { label: 'Code', url: 'https://github.com/libishm1/Colmap_Photogrammetry_Drone_video' }],
      credits: 'With thanks to Sachin Patil for assistance and Prof. Dr Pandurang for survey guidance (acknowledged in Caerdroia 54).',
      metrics: [{ v: '10.3 · 11.8 m', k: 'labyrinth diameters' }, { v: '2 FPS', k: 'frame extraction' }, { v: 'Poisson', k: 'surface meshing' }, { v: 'PLY · STL', k: 'outputs' }],
      images: [
        ['d-labyrinth', 'Stone labyrinth from the drone arc', { wide: true }],
        ['d-labyrinth-print', '3D print of the reconstructed labyrinth'],
      ] },

    { slug: 'motif-depth', section: 'B', year: '2025',
      kicker: 'Temple reliefs · Zenodo datasets', title: 'Temple Motif Depth Reconstruction', sub: 'Monocular depth of Tamil bas-relief motifs with Depth Anything 3',
      meta: ['2025', 'Monocular depth', 'Tamil Nadu'],
      lead: 'A single photograph of a temple bas-relief motif gives back carveable 3D.',
      body: 'The motifs are carved on temples in Thanjavur, Erode and Namakkal. An interactive CLI runs Depth Anything 3 on a single smartphone photograph of each, with a live preview to tune depth, mask and smoothing, then exports watertight STL for study or fabrication.\nWith it comes a 35-panel validated mesh corpus and a motif glossary of iconography in Tamil traditions, released openly for conservation and research.',
      contrib: ['Interactive monocular-depth-to-STL reconstruction CLI', '35-panel validated mesh corpus (Zenodo)', 'Open motif glossary + iconographic documentation'],
      tags: ['Depth Anything 3', 'Open3D', 'STL', 'Heritage'], links: [{ label: 'Mesh corpus · Zenodo', url: 'https://doi.org/10.5281/zenodo.19846595' }, { label: 'Code', url: 'https://github.com/libishm1/Depth_Anything_3_Motifs_CLI' }],
      images: [
        ['d-motif-mesh', 'Thanjavur bas-relief motif · recovered relief mesh'],
        ['d-motif-panels', 'Original, raw depth, mask and smooth depth', { wide: true, contain: true }],
        ['d-motif-depth', 'Photograph and smoothed depth field', { contain: true }],
      ] },

    { slug: 'icp-registration', section: 'B', year: '2023-25',
      kicker: 'Reconstruction · Open3D', title: 'Semi-automatic ICP Registration', sub: 'Comparing photogrammetric methods via coarse + fine alignment',
      meta: ['2023-25', 'Registration', 'Open3D'],
      lead: 'A small tool aligns photogrammetry meshes and shows where the methods differ.',
      body: 'The script benchmarks photogrammetry outputs by aligning them with a two-stage registration: a coarse global alignment followed by fine ICP refinement in Open3D. It gives a repeatable way to quantify how reconstruction methods diverge on the same subject.\nBuilt to support the broader heritage-reconstruction work - keeping scan comparison honest and measurable.',
      contrib: ['Coarse-to-fine ICP registration of photogrammetric meshes', 'Quantitative comparison across reconstruction methods', 'Lightweight, reproducible Open3D workflow'],
      tags: ['ICP', 'Open3D', 'Point cloud', 'Registration'], links: [{ label: 'Code', url: 'https://github.com/libishm1/Semi_automatic_ICP_open3D' }],
      metrics: [{ v: '2-stage', k: 'coarse + fine' }, { v: 'ICP', k: 'fine alignment' }, { v: 'Open3D', k: 'engine' }, { v: 'mesh ↔ PCD', k: 'comparison' }],
      images: [['d-icp', 'Registered photogrammetric meshes, deviation in colour', { contain: true }]] },

    { slug: 'thermal-sensing', section: 'B', year: '2022', robot: true,
      kicker: 'Workshop 2.2 · MRAC', title: 'Multispectral Thermal Sensing', sub: 'Thermal point-cloud acquisition with mobile robots & drones',
      meta: ['2022', 'Thermal + depth', 'ROS'],
      lead: 'A mobile robot fuses thermal, RGB and depth images into point clouds of a building’s heat.',
      body: 'A chain of ROS packages and OpenCV registers the thermal images into the depth frames. A TurtleBot was used to tune the capture parameters before deployment on autonomous vehicles.\nThe robot maps and saves the space with gmapping for 2D navigation, while thermal data is reprojected into the other camera frames and assembled into coloured thermal point clouds.',
      contrib: ['Thermal-depth registration and reprojection pipeline', 'ROS bring-up, gmapping and 2D navigation goals in RViz', 'Assembled coloured thermal point clouds of interiors'],
      tags: ['ROS', 'RealSense', 'Thermal', 'gmapping'], links: [{ label: 'IAAC blog', url: 'https://www.iaacblog.com/programs/workshop-2-2-multispectral-cognification-thermal-point-cloud-aquisition-assemblin/' }],
      credits: 'Team (MRAC01 Workshop 2.2, 2022): Amy Jojo Kim, Mit Patel, Robert Michael Blackburn, Libish Murugesan, Jordi Vilanova, Huanyu Li · Faculty: Sebastian Kay, Ardeshir Talaei, Vincent Huyghe.',
      images: [
        ['old-thermal-room', 'Assembled thermal point cloud of a room'],
        ['old-thermal-cloud', 'Coloured thermal point cloud'],
        ['dx-page-10-3', 'Depth image from the capture rig'],
        ['dx-page-10-4', 'Thermal image, registered into the depth frame'],
      ] },

    // ================= C · Computational Tools =================
    { slug: 'frahan', section: 'C', year: '2026', feature: true, model: 'pendentive',
      kicker: 'Research preview · Rhino 8 / Grasshopper plugin', title: 'Frahan StonePack', sub: 'Stone-fabrication readiness for Rhino 8 / Grasshopper',
      meta: ["2026", "v0.1.2-alpha", "GPL-3.0"],
      lead: 'Stone arrives fractured and irregular; this plugin takes it from quarry bench to vault.',
      body: "Frahan StonePack puts the research on stone packing, scanning and robotic fabrication into a Rhino 8 / Grasshopper toolkit: 275 components in 20 families along a nine-stage pipeline, from scan and GPR ingest and fracture mapping, through reconstruction, fracture networks, block cutting and 2D nesting, to masonry assembly, reassembly and fabrication export.\nAt the building end it packs, nests and matches irregular stones into rubble and ashlar walls, voussoir arches and form-found vaults such as a Park Güell-inspired barrel, and checks each for compression-only stability before exporting cut plans, robot frames or IFC. Every component cites its source and sits in a live connection graph; the algorithm core is machine-checked in Lean 4.",
      contrib: ["275 components in 20 families across a nine-stage stone pipeline", "Quarry to building: GPR fractures, block cutting, nesting, masonry, IFC and robot export", "Compression-only stability checks (Güell barrel: 452 blocks, 841 interfaces, zero tension)"],
      tags: ['Rhino 8', 'Grasshopper', 'C# / Python', 'Stone fabrication'], links: [{ label: 'GitHub', url: 'https://github.com/libishm1/Frahan' }, { label: 'Zenodo DOI', url: 'https://doi.org/10.5281/zenodo.21209689' }, { label: 'Method preprint', url: 'https://doi.org/10.21203/rs.3.rs-10035624/v1' }],
      metrics: [{"v": "275", "k": "components"}, {"v": "9", "k": "pipeline stages"}, {"v": "52", "k": "worked examples"}, {"v": "151", "k": "graph edges"}],
      steps: {"title": "Quarry to building", "items": [["frahan-dfn-quarry-bench", "Fracture network in the bench"], ["frahan-fracture-block-packing", "Blocks packed around fractures"], ["frahan-bedding-aligned-blocks", "Bedding-aligned wire-saw blocks"], ["frahan-quarry-to-slabs", "Blocks cut to slabs"], ["frahan-castle-keep", "Stones assembled, exported to IFC"]]},
      images: [["frahan-guell-portico-interior", "Inside the Park Güell-inspired portico: irregular rubble stones skin the form-found barrel vault as it sweeps into the leaning colonnade.", {"title": "Güell portico, interior", "wide": true}], ["frahan-guell-rubble-vault", "Close-up of the Güell rubble vault: irregular stones fitted cell by cell over a thrust-following quad remesh of the funicular shell.", {"title": "Güell rubble vault skin"}], ["frahan-pendentive-vault", "A pendentive (sail) vault of 36 voussoirs, each trimmed from a matched rubble boulder · 98.3% of the shell volume recovered from real stone.", {"title": "Pendentive vault from rubble"}], ["frahan-guell-barrel-cra", "The Güell barrel vault as a 452-block, 841-interface rigid-block assembly, certified compression-only stable with zero tension (blue = supports).", {"title": "Güell barrel, certified stable"}], ["frahan-rubble-voussoir-arch", "An 11-voussoir semicircular arch (4.0 m span) where every voussoir is trimmed from a real scanned rubble stone · 94.9% coverage.", {"title": "Rubble voussoir arch"}], ["frahan-voronoi-block-wall", "Fifty polyhedral stones in a 3D Voronoi wall, coloured by the install order recovered from shared-face adjacency (blue set first, red set last).", {"title": "3D Voronoi block wall"}], ["frahan-dry-stone-wall-nbo", "A next-best-object planner builds straight and curved dry-stone walls from scanned stones, choosing the best stone and pose at each step · coloured by course.", {"title": "Next-best-object dry-stone walls"}], ["frahan-stone-wall-robot-frames", "Robot handoff for a dry-stone wall: each placed stone carries a place frame for a UR arm, with a force-seat URScript program generated per stone (simulation only).", {"title": "Stone wall to robot frames"}], ["frahan-castle-portal", "Portal of the castle keep: a 9-voussoir arch fills an opening cut through the generated wall stones, with masonry continuing over the extrados.", {"title": "Castle portal detail"}], ["frahan-trencadis-twist", "A 176-shard trencadís mosaic mapped onto a twisted monument after automatic angle-based surface segmentation.", {"title": "Trencadís on a twisted block"}], ["frahan-statue-to-blocks", "A 3 m sculpture split into 0.5 m blocks: boundary blocks (red) keep the real carved surface, interior blocks (blue) are plain stock.", {"title": "Sculpture to stone blocks"}], ["frahan-dfn-quarry-bench", "A discrete fracture network generated from scanned joint sets and clipped to a quarry bench, the input to block-cut yield optimisation.", {"title": "Fracture network in a quarry bench"}], ["frahan-fracture-block-packing", "Wire-saw block packing in a fractured quarry bench: intact, saw-separable blocks are recovered around the mapped fracture surfaces.", {"title": "Fracture-aware block packing"}], ["frahan-bedding-aligned-blocks", "Wire-saw blocks from the GPR cross-lithology study, rotated in plan to follow the bedding direction (red arrow = dip azimuth) while staying plumb for the saw.", {"title": "Bedding-aligned wire-saw blocks"}], ["frahan-quarry-to-slabs", "Quarry to slab: 60 fracture-free dimension blocks gang-sawn into 888 slabs of 20 mm, a 37.3% end-to-end volume yield.", {"title": "Quarry block to slabs"}], ["frahan-castle-keep", "A small castle keep composed on the Grasshopper canvas: polygonal rubble walls, an arched portal and a pendentive dome, checked stable and exported as one IFC4 model.", {"title": "Castle keep to IFC"}], ["d-frahan-nest2d", "2D packing of irregular slabs", {}], ["d-frahan-costing", "Block → slab → facade, costed", {"wide": true, "contain": true}]] },

    { slug: 'topologic-studio', section: 'C', year: '2025-26',
      kicker: 'Research prototype · original author Wassim Jabi', title: 'Topologic Studio', sub: 'Browser-based IFC fire-egress simulation',
      meta: ['2025-26', 'IFC · graphs', 'Web app'],
      lead: 'Load an IFC model and the escape path redraws itself as the fire spreads.',
      body: 'IFC models are parsed in-browser with web-ifc; floors, stairs and doors become a navigation graph across all levels. A wall-aware Dijkstra computes egress paths, while a temperature-diffusion model streams fire spread over Server-Sent Events and re-routes the path live as the thermal field evolves.\nWassim Jabi is the original author of Topologic Studio, which runs on TopologicPy, a React / Three.js front end and a FastAPI back end. I improved it and developed it further: the IFC egress graph, the fire simulation with live re-routing, and a tabular Q-learning agent that learns escape routes as the fire moves.',
      contrib: ['In-browser IFC → spatial navigation graph', 'Hazard-weighted dynamic re-routing streamed over SSE', 'Q-learning egress agent under evolving fire'],
      tags: ['TopologicPy', 'web-ifc', 'Three.js', 'FastAPI'], links: [{ label: 'Live demo', url: 'https://libishm1.github.io/Topologic_Studio/' }, { label: 'Code', url: 'https://github.com/libishm1/Topologic_Studio' }],
      metrics: [{ v: '1,866', k: 'graph nodes' }, { v: '1,552', k: 'edges' }, { v: 'SSE', k: 'live fire stream' }, { v: 'Q-learning', k: 'RL egress' }],
      images: [['d-topologic', 'IFC-native graph generation, fire diffusion and adaptive routing', { wide: true }]] },

    { slug: 'ur10e-stacking', section: 'C', year: '2026', robot: true,
      kicker: 'Robotics · ROS 2 Humble', title: 'UR10e + RG6 Robotic Stacking', sub: 'Pick-and-place stack on ROS 2 + MoveIt 2 (WSL2)',
      meta: ['2026', 'ROS 2 · MoveIt 2', 'Pick-place'],
      lead: 'The same UR10e + OnRobot RG6 stack runs in simulation and on the real arm.',
      body: 'An 80-waypoint pick-and-place program runs on ROS 2 Humble and MoveIt 2, in WSL2 on Windows, with visualised box stacking. One-shot scripts start and stop it all: simulation, the real arm, and an RS-485 Modbus bridge to the RG6 gripper.\nVendor packages are pinned by commit and bootstrapped with vcs import; a self-contained Docker image rebuilds the whole workspace, with a Grasshopper bridge on the Windows side.',
      contrib: ['UR10e + RG6 MoveIt 2 config, SRDF, controllers, launch', 'RS-485 Modbus gripper bridge + operator scripts', 'Reproducible Docker workspace + Grasshopper bridge'],
      tags: ['ROS 2', 'MoveIt 2', 'UR10e', 'Docker', 'WSL2'], links: [{ label: 'Code', url: 'https://github.com/libishm1/UR-10e_RG6_stacking_ROS2_wsl_gh' }],
      metrics: [{ v: '80', k: 'waypoints' }, { v: 'Pilz · OMPL', k: 'planners tested' }, { v: 'RS-485', k: 'gripper bridge' }, { v: 'Docker', k: 'one-shot stack' }],
      compare: { title: 'Simulation vs real UR10e', a: 'd-ur-stacking', al: 'Simulation', b: 'd-ur-real', bl: 'Real · UR10e', ratio: '1 / 1' },
      images: [['d-ur-real', 'Real UR10e with the OnRobot RG6 stacking blocks'], ['d-ur-stacking', 'MoveIt 2 simulation of the stacking program']] },

    { slug: 'pointing-machine', section: 'C', year: '2026',
      kicker: 'Digital Fabrication · PWA', title: 'Digital Pointing Machine', sub: 'A sculptor’s pointing machine, rebuilt for digital stock',
      meta: ['2026', 'Three.js · BVH', 'Carving'],
      lead: 'Points move from a digital maquette to a block of stone or wood, to the millimetre.',
      body: 'A web app rebuilds the traditional sculptor’s pointing machine. It wraps a high-resolution scan in a stock block the user sizes; click a point and it shoots a ray to the block surface and returns the exact perpendicular drill depth, drawing start, end and path.\nReact Three Fiber and three-mesh-bvh keep the raycasting exact on dense geometry, and a clipping plane simulates the roughing passes. It installs as an offline PWA.',
      contrib: ['BVH-accelerated exact raycasting for point transfer', 'Automatic stock-block sizing with margin / kerf', 'Clipping-plane carving-stage simulation · offline PWA'],
      tags: ['React Three Fiber', 'three-mesh-bvh', 'STL · 3DM', 'PWA'], links: [{ label: 'Open the app', url: 'https://libishm1.github.io/Digital_pointing_machine/' }, { label: 'Code', url: 'https://github.com/libishm1/Digital_pointing_machine' }],
      metrics: [{ v: 'mm', k: 'point accuracy' }, { v: 'BVH', k: 'exact raycast' }, { v: 'STL·OBJ·3DM', k: 'inputs' }, { v: 'PWA', k: 'offline install' }],
      images: [['d-pointing', 'Digital stock block, drill-depth rays and carving-stage clipping', { wide: true }]] },

    // ================= D · Architecture & Studio =================
    { slug: 'terrain-plotted', section: 'D', year: '2024-25', feature: true,
      kicker: 'Computational Design · Godrej Properties', title: 'Terrain-Driven Plotted Development', sub: 'Road-network generation and cut-and-fill optimisation on sloped terrain',
      meta: ['2024-25', 'Grasshopper', 'Site / terrain'],
      lead: 'On a sloped site, my scripts generate the road network and set plot levels so cut and fill balance.',
      body: 'Surveyor contours are rebuilt into a TIN terrain mesh; a road-construction script lays out the network and grades each segment within walkable limits. A cut-and-fill optimisation then sets plot and road levels to balance earthwork, read against slope and watershed analysis.\nThe plotted generative layout was developed in parallel by senior colleagues; my role covered the terrain meshes, roads, grading and earthwork-balancing scripts.',
      note: 'Site data is redacted for privacy.',
      contrib: ['TIN terrain meshes reconstructed from surveyor contours', 'Road construction with per-segment slope grading (1:11 - 1:66)', 'Cut-and-fill optimisation balancing earthwork vs. slope & watershed'],
      tags: ['Grasshopper', 'TIN / mesh', 'Slope analysis', 'Watershed', 'Cut & fill'], links: [],
      images: [
        ['d-gp-roadslope', 'Buildability analysis · road grades 1:11 - 1:66', { wide: true, contain: true }],
        ['d-gp-tin', 'TIN terrain with roads and plots', { contain: true }],
        ['d-gp-slope', 'Buildability on slope', { contain: true }],
        ['d-gp-cutfill', 'Buildability · built area (m²)', { contain: true }],
      ] },

    { slug: 'metal-cloud', section: 'D', year: '2020',
      kicker: 'Team · internship, Folds Design Studio with SRI Design Lab', title: 'Metal Cloud', sub: 'An auxetic metal pavilion formed as fabric',
      meta: ['2020', 'Auxetic', 'Pavilion'],
      lead: 'An auxetic cut pattern lets sheet metal drape like fabric into the intended form.',
      body: 'The pavilion looks at architecture from the manufacturing side: minimal material, robotic CNC and hands-on fabrication in a single element. The auxetic pattern lets the metal expand and drape into folded volumes, stiffer or softer with the thickness of the sheet.\nPhysics simulation estimates how far the chosen pattern expands in plane. The final pavilion is shaped partly by gravity and partly by artistic hammering.',
      contrib: ['Research assistant on computation and fabrication in the studio team', 'Physics simulation of the auxetic pattern’s in-plane expansion', 'CNC-router prototyping of the intended forms'],
      tags: ['Auxetics', 'Physics sim', 'Robotic CNC', 'Sheet metal'], links: [],
      compare: { title: 'Form-found mesh vs installed canopy', a: 'old-metal-wire-model', al: 'Simulated', b: 'old-metal-installed', bl: 'Installed', ratio: '16 / 9' },
      images: [
        ['old-metal-installed', 'Metal Cloud installed, draped by gravity and hammering'],
        ['old-metal-auxetic-close', 'Auxetic cuts opening as the sheet drapes', { wide: true }],
        ['old-metal-wire-model', 'Form-found canopy mesh'],
        ['old-metal-canopy-night', 'The canopy lit at night'],
        ['old-metal-pattern', 'Auxetic pattern from below'],
        ['old-metal-bowl', 'Auxetic sample shell'],
        ['old-metal-expo', 'The pavilion at the exhibition'],
      ] },

    { slug: 'building-for-a-billion', section: 'D', year: '2018',
      kicker: 'Team · FHD Group · computational design & 3D modelling', title: 'Building for a Billion', sub: 'Incremental low-cost housing via multi-objective optimisation',
      meta: ['2018', 'Optimisation', 'Housing'],
      lead: 'Household needs set the modules, and the modules grow into low-cost communes.',
      body: 'User priorities drive a bottom-up design: incremental modules for four household typologies, aggregated into communes. A multi-objective optimisation fits as many modules as it can while keeping solar radiation on their surfaces low and social space (isovists) high.\nHow the modules aggregate is how the whole settlement is planned; the optimisation returns commune variants tuned to occupancy and climate.',
      contrib: ['Computational design in the team: multi-objective optimisation of module count, radiation and isovists', '3D modelling of the incremental modules and commune variants', 'Settlement-scale aggregation into communes, with the team'],
      tags: ['Multi-objective', 'Isovists', 'Radiation', 'Generative'], links: [],
      images: [
        ['old-b4b-street', 'Commune street render'],
        ['old-b4b-plan', 'Settlement master plan'],
        ['old-b4b-generations', 'Commune generations from the optimisation'],
        ['old-b4b-radiation', 'Radiation analysis of commune variants', { contain: true }],
      ] },
  ],

  // Selected studio work (lightbox galleries)
  studio: [
    { title: 'Bamboo Pavilion', sub: 'FHD, 2019 · anticlastic shelter tied with rope knots', images: [['old-bamboo-render', 'Pool-deck shelter render'], ['old-bamboo-model-a', 'Anticlastic study model'], ['old-bamboo-model-b', 'Shelter model'], ['old-bamboo-sections', 'Sections: rope-knot joints for a traditional workforce']] },
    { title: 'Pandemic Prototyping', sub: '2020 · scissor-joint structures, 3D-printed masks', images: [['old-proto-hoberman-b', 'Transformable icosidodecahedron, expanded'], ['old-proto-hoberman-a', 'Scissor-joint sphere, collapsed'], ['old-proto-alu-unit', 'Aluminium pavilion unit'], ['old-proto-unfold', 'Faces grouped and unrolled with graph theory'], ['old-proto-mask-cad', 'Mask with a replaceable HEPA filter'], ['old-proto-mask-print', '3D-printed mask']] },
    { title: 'Chatras · Landscape', sub: '2018 · deployable origami shading, daylight analysis', images: [['old-chatras-origami', 'Deployable origami shades with radial actuators'], ['old-chatras-sketch', 'Shade canopy sketch']] },
    { title: 'Exploratorium', sub: '2019 · B.Arch thesis · new-media museum, kinetic ceiling', images: [['d-cover-min', '3D-printed shell inspired by Frei Otto, from my B.Arch thesis'], ['old-explo-projection', 'Experience centre augmented with projection'], ['old-explo-kinetic', 'Kinetic ceiling'], ['old-explo-print', 'Atrium structure study']] },
    { title: 'Bhavan · Hotel', sub: '2016 · algorithmic river-view facade optimisation', images: [['old-bhavan-facade', 'Optimised river-view facade'], ['old-bhavan-model', 'Hotel massing with the facade screen']] },
    { title: 'Sensing the Thermal Env.', sub: 'PANDORA · MRAC team, 2022 · schlieren imaging + urban CFD', images: [['old-thermal-schlieren', 'Schlieren imaging of hot air around an object'], ['old-thermal-hog', 'Flow field from optical flow and HOG'], ['old-thermal-cfd', 'Urban CFD thermal-comfort mapping']] },
    { title: 'Plant-D Rover', sub: 'MRAC team, 2022 · ROS plant-health detection & mapping', images: [['old-plantd-detect', 'Plant status detection on the rover camera feed'], ['old-plantd-rover', 'Mapping run over the plant field']] },
    { title: 'Urban Rejuvenation', sub: '2019 · transit-centre public intervention', images: [['old-urban-concourse', 'Transit concourse']] },
    { title: 'Mixed Use · Amaravati', sub: '2018 · the residential street as landscape', images: [['old-amaravati-model', 'The residential street, study model']] },
  ],

  // Frahan gallery + 3D models: filled from the Frahan repo
  stoneIntro: "Frahan StonePack is an open-source Rhino 8 and Grasshopper plugin that takes stone from the ground to the building. It reads ground-penetrating radar and 3D scans, maps fractures and joint sets, and plans how a fractured quarry can be cut into sound blocks and slabs. The same toolkit packs, nests and matches irregular stones into rubble and ashlar walls, carved voussoir arches and form-found vaults such as a Park Güell-inspired barrel, then checks each assembly for compression-only stability before exporting cut plans, robot frames or IFC models. It ships 275 Grasshopper components in 20 families, 52 worked examples and an algorithm core machine-checked in Lean 4, released under GPL-3.0 as a research preview (its Kintsugi module is a port of PuzzleFusion++, for non-commercial research use only).",
  stone: [["frahan-guell-portico-interior", "Inside the Park Güell-inspired portico: irregular rubble stones skin the form-found barrel vault as it sweeps into the leaning colonnade.", {"title": "Güell portico, interior"}], ["frahan-guell-rubble-vault", "Close-up of the Güell rubble vault: irregular stones fitted cell by cell over a thrust-following quad remesh of the funicular shell.", {"title": "Güell rubble vault skin"}], ["frahan-fracture-block-packing", "Wire-saw block packing in a fractured quarry bench: intact, saw-separable blocks are recovered around the mapped fracture surfaces.", {"title": "Fracture-aware block packing"}], ["frahan-pendentive-vault", "A pendentive (sail) vault of 36 voussoirs, each trimmed from a matched rubble boulder · 98.3% of the shell volume recovered from real stone.", {"title": "Pendentive vault from rubble"}], ["frahan-castle-keep", "A small castle keep composed on the Grasshopper canvas: polygonal rubble walls, an arched portal and a pendentive dome, checked stable and exported as one IFC4 model.", {"title": "Castle keep to IFC"}], ["frahan-voronoi-block-wall", "Fifty polyhedral stones in a 3D Voronoi wall, coloured by the install order recovered from shared-face adjacency (blue set first, red set last).", {"title": "3D Voronoi block wall"}], ["frahan-dry-stone-wall-nbo", "A next-best-object planner builds straight and curved dry-stone walls from scanned stones, choosing the best stone and pose at each step · coloured by course.", {"title": "Next-best-object dry-stone walls"}], ["frahan-dfn-quarry-bench", "A discrete fracture network generated from scanned joint sets and clipped to a quarry bench, the input to block-cut yield optimisation.", {"title": "Fracture network in a quarry bench"}], ["frahan-rubble-voussoir-arch", "An 11-voussoir semicircular arch (4.0 m span) where every voussoir is trimmed from a real scanned rubble stone · 94.9% coverage.", {"title": "Rubble voussoir arch"}], ["frahan-guell-barrel-cra", "The Güell barrel vault as a 452-block, 841-interface rigid-block assembly, certified compression-only stable with zero tension (blue = supports).", {"title": "Güell barrel, certified stable"}], ["frahan-castle-portal", "Portal of the castle keep: a 9-voussoir arch fills an opening cut through the generated wall stones, with masonry continuing over the extrados.", {"title": "Castle portal detail"}], ["frahan-stone-wall-robot-frames", "Robot handoff for a dry-stone wall: each placed stone carries a place frame for a UR arm, with a force-seat URScript program generated per stone (simulation only).", {"title": "Stone wall to robot frames"}], ["frahan-oblique-marble-blocks", "Marble blocks sheared to ride GPR-kriged bed surfaces, so each block follows the bed dip and never crosses a fracture.", {"title": "Dip-following marble blocks"}], ["frahan-bedding-aligned-blocks", "Wire-saw blocks from the GPR cross-lithology study, rotated in plan to follow the bedding direction (red arrow = dip azimuth) while staying plumb for the saw.", {"title": "Bedding-aligned wire-saw blocks"}], ["frahan-pendentive-voussoirs", "Cut-stone voussoirs of a pendentive vault, with bed joints following the sphere's lines of curvature for stable dry assembly.", {"title": "Pendentive vault voussoirs"}], ["frahan-quarry-to-slabs", "Quarry to slab: 60 fracture-free dimension blocks gang-sawn into 888 slabs of 20 mm, a 37.3% end-to-end volume yield.", {"title": "Quarry block to slabs"}], ["frahan-statue-to-blocks", "A 3 m sculpture split into 0.5 m blocks: boundary blocks (red) keep the real carved surface, interior blocks (blue) are plain stock.", {"title": "Sculpture to stone blocks"}], ["frahan-trencadis-twist", "A 176-shard trencadís mosaic mapped onto a twisted monument after automatic angle-based surface segmentation.", {"title": "Trencadís on a twisted block"}]],
  models: [{"id": "pendentive", "file": "models/frahan-pendentive-vault.glb", "title": "Pendentive vault", "sub": "36 voussoirs", "unit": "voussoirs", "desc": "A pendentive (sail) vault of 36 voussoirs, each trimmed from a scanned rubble boulder, on a 3.2 m square plan. Colours as in the repo.", "bytes": 336776, "camera": {"dir": [1, 0.42, 1.15], "dist": 1.95}, "bbox": "3.7 × 3.7 × 1.8 m"}, {"id": "guell", "recolor": true, "file": "models/frahan-guell-barrel-vault.glb", "title": "Güell barrel vault", "sub": "452 blocks · 16 m", "unit": "blocks", "desc": "The Park Güell-inspired barrel shell from the Frahan vault example, divided here into 452 blocks 0.28 m thick for viewing. The block outlines in this viewer are illustrative; the certified stable assembly (452 blocks, 841 interfaces, zero tension) is in the gallery below.", "bytes": 2545480, "camera": {"dir": [1, 0.3, 0.55], "dist": 0.95}, "bbox": "16.0 × 4.4 × 3.8 m"}, {"id": "castle", "recolor": true, "file": "models/frahan-castle-keep.glb", "title": "Castle keep", "sub": "125 stones · IFC", "unit": "stones", "desc": "The castle keep from the repo’s IFC4 export: four polygonal rubble walls, a 9-voussoir portal arch, tympanum infill and an 18-piece pendentive dome.", "bytes": 339884, "camera": {"dir": [0.9, 0.45, 1.25], "dist": 2.25}, "bbox": "6.1 × 6.1 × 5.6 m"}, {"id": "arch", "file": "models/frahan-rubble-voussoir-arch.glb", "title": "Rubble voussoir arch", "sub": "11 voussoirs · 4 m span", "unit": "voussoirs", "desc": "An 11-voussoir semicircular arch with a 4.0 m span, every voussoir trimmed from a real scanned rubble stone.", "bytes": 179724, "camera": {"dir": [0.35, 0.18, 1], "dist": 1.45}, "bbox": "5.1 × 0.6 × 2.5 m"}, {"id": "wall", "file": "models/frahan-rubble-wall.glb", "title": "Rubble masonry wall", "sub": "40 scanned stones", "unit": "stones", "desc": "Forty scanned dry-stones settled into a 10.2 m rubble wall. The repo colours them by course band; here they are shown in stone tones.", "recolor": true, "bytes": 2008324, "camera": {"dir": [0.28, 0.22, 1], "dist": 1.2}, "bbox": "10.2 × 1.2 × 3.9 m"}],

  pubs: [
    {
      "year": 2026,
      "type": "dataset",
      "title": "Kuppam dolerite benches: ground-penetrating radar fracture model, verification and block yield - pilot dataset",
      "authors": "Libish Murugesan",
      "venue": "figshare",
      "doi": "10.6084/m9.figshare.33690616",
      "url": "https://doi.org/10.6084/m9.figshare.33690616",
      "note": "GPR survey of three dolerite benches near Kuppam, re-processed into fracture surfaces, a block cutting plan and an uncertainty analysis (v3, GPL-3.0+).",
      "project": "kuppam-gpr"
    },
    {
      "year": 2026,
      "type": "software",
      "title": "Frahan StonePack",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.21209689",
      "url": "https://doi.org/10.5281/zenodo.21209689",
      "note": "Archived releases (v0.1.0 to v0.1.2 alpha) of the Rhino/Grasshopper plugin for stone fabrication, from GPR and scans to block packing (GPL-3.0).",
      "project": "frahan"
    },
    {
      "year": 2026,
      "type": "preprint",
      "title": "A managed, uncertainty-aware pipeline from ground-penetrating radar to dimension-stone block yield in fractured quarries",
      "authors": "Libish Murugesan",
      "venue": "Research Square",
      "doi": "10.21203/rs.3.rs-10035624/v1",
      "url": "https://www.researchsquare.com/article/rs-10035624/v1",
      "note": "Sole-author preprint that turns GPR fracture picks into 3D fracture surfaces and carries the uncertainty through to quarry block yield (CC BY 4.0, not yet peer reviewed).",
      "project": "frahan"
    },
    {
      "year": 2026,
      "type": "software",
      "title": "Reproducibility package for \"A managed, uncertainty-aware pipeline from ground-penetrating radar to dimension-stone block yield in fractured quarries\"",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.20608279",
      "url": "https://doi.org/10.5281/zenodo.20608279",
      "note": "Code, input geometry and results that regenerate every number and figure in the GPR block-yield preprint (files available on request).",
      "project": "frahan"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "gml-aec-knowledge-graph",
      "authors": "Abdulrahman Ahmed Alymani, Mohammed Alsofiani, Libish Murugesan, Ammar Alammar",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.20073214",
      "url": "https://doi.org/10.5281/zenodo.20073214",
      "note": "Knowledge graph and wiki of 112 papers on graph machine learning in architecture, engineering and construction, from a PRISMA 2020 review at Alfaisal University (files available on request).",
      "project": ""
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "3D Mesh Corpus: Tamil Temple Bas-Relief Motifs, 4 temples, Brihadeshwara, Rajagopalaswamy in Thanjavur, Narashimaswamy Namakal and Kulavilakkamman Temples, Kalamangalam (Depth_Anything_3_Motifs_CLI)",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19846595",
      "url": "https://doi.org/10.5281/zenodo.19846595",
      "note": "35 STL relief meshes from four Tamil Nadu temples, made from single smartphone photos with Depth Anything 3 and SAM.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "Motifs and Freize reliefs of the Narasimhaswamy Temple, Namakkal",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19469154",
      "url": "https://doi.org/10.5281/zenodo.19469154",
      "note": "Source photographs of carved motifs and friezes at the Narasimhaswamy Temple, Namakkal, used by the Depth Anything 3 motif pipeline.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "Motifs and Freize reliefs of the Kulavilakkaman temple in Kalamangalam, Erode",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19468980",
      "url": "https://doi.org/10.5281/zenodo.19468980",
      "note": "Source photographs of carved motifs and friezes at the Kulavilakkamman temple, Kalamangalam, used by the Depth Anything 3 motif pipeline.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "dataset",
      "title": "temple bas relief motifs in Thanjavur , Arulmigu Sri Rajagopalswamy Temple (1-11), Thanjai Periya Kovil (12-24)",
      "authors": "Libish Murugesan",
      "venue": "Zenodo",
      "doi": "10.5281/zenodo.19455013",
      "url": "https://doi.org/10.5281/zenodo.19455013",
      "note": "Source photographs of bas-relief motifs at the Rajagopalaswamy and Brihadeeswara (Periya Kovil) temples in Thanjavur, used by the Depth Anything 3 motif pipeline.",
      "project": "motif-depth"
    },
    {
      "year": 2026,
      "type": "journal",
      "title": "The Salem Labyrinth: Creating a 3D Model from Drone Footage",
      "authors": "Libish Murugesan",
      "venue": "Caerdroia 55 (Labyrinthos), pp. 62-63",
      "doi": "",
      "url": "https://labyrinthos.net/Caerdroia55HR.pdf",
      "note": "How one arc of drone video becomes a 3D model and a print: frame extraction, COLMAP structure-from-motion, Poisson meshing and a 3D print of the Salem labyrinths.",
      "project": "drone-labyrinths"
    },
    {
      "year": 2025,
      "type": "journal",
      "title": "Two Labyrinths Rediscovered in Salem, India",
      "authors": "Libish Murugesan",
      "venue": "Caerdroia 54 (Labyrinthos), pp. 44-45",
      "doi": "",
      "url": "https://labyrinthos.net/Caerdroia54HR.pdf",
      "note": "Field article on the two classical stone labyrinths (Ezhu Suthu Kottai) at Vembadithalam near Salem, Tamil Nadu; the issue is a free PDF.",
      "project": "drone-labyrinths"
    },
    {
      "year": 2022,
      "type": "conference",
      "title": "Programming Twist - Exploring the geometric affordances of aluminum through flexible robotic workflows",
      "authors": "Marielena Papandreou, Efilena Baseta, Arpan Mathe, Robert Michael Blackburn, Libish Murugesan",
      "venue": "eCAADe 2022, Ghent (Proceedings Vol. 2, pp. 399-408)",
      "doi": "10.52842/conf.ecaade.2022.2.399",
      "url": "https://papers.cumincad.org/cgi-bin/works/paper/ecaade2022_303",
      "note": "IAAC MRAC studio paper on folding and pressing flat aluminium strips into twisted forms with a small-payload robot.",
      "project": "crease-forming"
    }
  ],
  profiles: [{"label": "ORCID", "url": "https://orcid.org/0009-0004-3238-4202"}, {"label": "Zenodo", "url": "https://zenodo.org/search?q=metadata.creators.person_or_org.identifiers.identifier%3A%220009-0004-3238-4202%22"}, {"label": "GitHub", "url": "https://github.com/libishm1"}],
  orcid: '0009-0004-3238-4202',

  archivePlates: 23,
  archiveTitles: { 1: 'Cover', 2: 'Contents', 3: 'CCLT', 4: 'Log Pavilion', 5: 'Crease Forming', 6: 'Möbius strip', 7: 'Automated Spolia', 8: 'Spolia · geometry', 9: 'Spolia · motion', 10: 'Multispectral', 11: 'Lattice printing', 12: 'Plant-D', 13: 'Metal Cloud', 14: 'Metal Cloud · installed', 15: 'Building for a Billion', 16: 'Bhavan', 17: 'Urban Rejuvenation', 18: 'Amaravati', 19: 'Chatras', 20: 'Bamboo Pavilion', 21: 'Exploratorium', 22: 'Prototyping', 23: 'Thermal environment' },

  repos: [
    { name: 'Frahan', desc: 'Stone in computational design - Rhino 8 / Grasshopper stone-fabrication readiness plugin', url: 'https://github.com/libishm1/Frahan' },
    { name: 'Kuppam_granite-deposit_GPR-Fracture_study', desc: 'Open GPR fracture model, verification and block yield of a black granite quarry', url: 'https://github.com/libishm1/Kuppam_granite-deposit_GPR-Fracture_study' },
    { name: 'Topologic_Studio', desc: 'Topologic Studio, original author Wassim Jabi; improved and developed with IFC loading and fire-egress simulation', url: 'https://github.com/libishm1/Topologic_Studio' },
    { name: 'Depth_Anything_3_Motifs_CLI', desc: 'Monocular depth reconstruction of Tamil temple bas-relief motifs', url: 'https://github.com/libishm1/Depth_Anything_3_Motifs_CLI' },
    { name: 'Colmap_Photogrammetry_Drone_video', desc: 'Open-source drone-video → textured mesh heritage pipeline', url: 'https://github.com/libishm1/Colmap_Photogrammetry_Drone_video' },
    { name: 'UR-10e_RG6_stacking_ROS2', desc: 'UR10e + OnRobot RG6 pick-and-place on ROS 2 + MoveIt 2 (WSL2)', url: 'https://github.com/libishm1/UR-10e_RG6_stacking_ROS2_wsl_gh' },
    { name: 'Digital_pointing_machine', desc: 'Digital sculptor’s pointing machine - React Three Fiber PWA', url: 'https://github.com/libishm1/Digital_pointing_machine' },
    { name: 'Semi_automatic_ICP_open3D', desc: 'Coarse-to-fine ICP comparison of photogrammetric methods', url: 'https://github.com/libishm1/Semi_automatic_ICP_open3D' },
    
  ],
};
