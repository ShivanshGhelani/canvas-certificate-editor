// Template Manager for Background Templates
class TemplateManager {
  constructor() {
    this.templates = [
      // Seminar Templates
      {
        id: 'seminar-1',
        name: 'Professional Seminar',
        description: 'Elegant design for seminars and conferences',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_1f94nb1f94nb1f94.png',
        layout: {
          titlePosition: { top: '15%', fontSize: '48px' },
          contentArea: { top: '30%', height: '40%' },
          signatureArea: { top: '80%', layout: 'horizontal' },
          signatures: [
            { position: { left: '15%', top: '85%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '85%' }, title: 'Head of Department' },
            { position: { left: '70%', top: '85%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-2',
        name: 'Academic Seminar',
        description: 'Scholarly design for academic seminars',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_24edfy24edfy24ed.png',
        layout: {
          titlePosition: { top: '20%', fontSize: '44px' },
          contentArea: { top: '35%', height: '35%' },
          signatureArea: { top: '82%', layout: 'horizontal' },
          signatures: [
            { position: { left: '12%', top: '87%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '87%' }, title: 'Head of Department' },
            { position: { left: '73%', top: '87%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-3',
        name: 'Modern Seminar',
        description: 'Contemporary seminar certificate design',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_bephe7bephe7beph.png',
        layout: {
          titlePosition: { top: '18%', fontSize: '46px' },
          contentArea: { top: '32%', height: '38%' },
          signatureArea: { top: '78%', layout: 'horizontal' },
          signatures: [
            { position: { left: '18%', top: '83%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '83%' }, title: 'Head of Department' },
            { position: { left: '67%', top: '83%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-4',
        name: 'Business Seminar',
        description: 'Professional business seminar certificate',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_br24fkbr24fkbr24.png',
        layout: {
          titlePosition: { top: '22%', fontSize: '42px' },
          contentArea: { top: '37%', height: '33%' },
          signatureArea: { top: '84%', layout: 'horizontal' },
          signatures: [
            { position: { left: '15%', top: '89%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '89%' }, title: 'Head of Department' },
            { position: { left: '70%', top: '89%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-5',
        name: 'Classic Seminar',
        description: 'Traditional seminar certificate layout',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_btrebtrebtrebtre.png',
        layout: {
          titlePosition: { top: '25%', fontSize: '40px' },
          contentArea: { top: '40%', height: '30%' },
          signatureArea: { top: '85%', layout: 'horizontal' },
          signatures: [
            { position: { left: '20%', top: '90%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '90%' }, title: 'Head of Department' },
            { position: { left: '65%', top: '90%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-6',
        name: 'Executive Seminar',
        description: 'Executive-level seminar certificate',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_j2un03j2un03j2un.png',
        layout: {
          titlePosition: { top: '16%', fontSize: '50px' },
          contentArea: { top: '31%', height: '42%' },
          signatureArea: { top: '81%', layout: 'horizontal' },
          signatures: [
            { position: { left: '16%', top: '86%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '86%' }, title: 'Head of Department' },
            { position: { left: '69%', top: '86%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-7',
        name: 'Training Seminar',
        description: 'Training and development seminar design',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_t6y38t6y38t6y38t.png',
        layout: {
          titlePosition: { top: '19%', fontSize: '45px' },
          contentArea: { top: '34%', height: '36%' },
          signatureArea: { top: '83%', layout: 'horizontal' },
          signatures: [
            { position: { left: '17%', top: '88%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '88%' }, title: 'Head of Department' },
            { position: { left: '68%', top: '88%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'seminar-8',
        name: 'Workshop Seminar',
        description: 'Interactive workshop seminar certificate',
        category: 'seminar',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_x7hbmlx7hbmlx7hb.png',
        layout: {
          titlePosition: { top: '21%', fontSize: '43px' },
          contentArea: { top: '36%', height: '34%' },
          signatureArea: { top: '82%', layout: 'horizontal' },
          signatures: [
            { position: { left: '19%', top: '87%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '87%' }, title: 'Head of Department' },
            { position: { left: '66%', top: '87%' }, title: 'Principal' }
          ]
        }
      },

      // Sports Templates
      {
        id: 'sports-1',
        name: 'Champion Sports',
        description: 'Victory and achievement sports certificate',
        category: 'sports',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_3v1wh23v1wh23v1w.png',
        layout: {
          titlePosition: { top: '12%', fontSize: '52px' },
          contentArea: { top: '28%', height: '44%' },
          signatureArea: { top: '79%', layout: 'horizontal' },
          signatures: [
            { position: { left: '14%', top: '84%' }, title: 'Coach' },
            { position: { left: '42.5%', top: '84%' }, title: 'Sports Director' },
            { position: { left: '71%', top: '84%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'sports-2',
        name: 'Athletic Excellence',
        description: 'Athletic performance recognition',
        category: 'sports',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_9yqoqx9yqoqx9yqo.png',
        layout: {
          titlePosition: { top: '14%', fontSize: '49px' },
          contentArea: { top: '30%', height: '41%' },
          signatureArea: { top: '80%', layout: 'horizontal' },
          signatures: [
            { position: { left: '16%', top: '85%' }, title: 'Coach' },
            { position: { left: '42.5%', top: '85%' }, title: 'Sports Director' },
            { position: { left: '69%', top: '85%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'sports-3',
        name: 'Team Sports',
        description: 'Team achievement and participation',
        category: 'sports',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_9yqoqx9yqoqx9yqo (5).png',
        layout: {
          titlePosition: { top: '17%', fontSize: '47px' },
          contentArea: { top: '33%', height: '38%' },
          signatureArea: { top: '82%', layout: 'horizontal' },
          signatures: [
            { position: { left: '15%', top: '87%' }, title: 'Team Captain' },
            { position: { left: '42.5%', top: '87%' }, title: 'Sports Director' },
            { position: { left: '70%', top: '87%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'sports-4',
        name: 'Competition Sports',
        description: 'Competition and tournament certificate',
        category: 'sports',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_9yqoqx9yqoqx9yqo (6).png',
        layout: {
          titlePosition: { top: '13%', fontSize: '51px' },
          contentArea: { top: '29%', height: '43%' },
          signatureArea: { top: '78%', layout: 'horizontal' },
          signatures: [
            { position: { left: '13%', top: '83%' }, title: 'Judge' },
            { position: { left: '42.5%', top: '83%' }, title: 'Sports Director' },
            { position: { left: '72%', top: '83%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'sports-5',
        name: 'Sports Merit',
        description: 'Merit and excellence in sports',
        category: 'sports',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_9yqoqx9yqoqx9yqo (7).png',
        layout: {
          titlePosition: { top: '16%', fontSize: '48px' },
          contentArea: { top: '32%', height: '39%' },
          signatureArea: { top: '81%', layout: 'horizontal' },
          signatures: [
            { position: { left: '17%', top: '86%' }, title: 'Coach' },
            { position: { left: '42.5%', top: '86%' }, title: 'Sports Director' },
            { position: { left: '68%', top: '86%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'sports-6',
        name: 'Sports Achievement',
        description: 'Outstanding sports achievement award',
        category: 'sports',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_ukqyhkukqyhkukqy.png',
        layout: {
          titlePosition: { top: '18%', fontSize: '46px' },
          contentArea: { top: '34%', height: '37%' },
          signatureArea: { top: '83%', layout: 'horizontal' },
          signatures: [
            { position: { left: '18%', top: '88%' }, title: 'Coach' },
            { position: { left: '42.5%', top: '88%' }, title: 'Sports Director' },
            { position: { left: '67%', top: '88%' }, title: 'Principal' }
          ]
        }
      },

      // Tech Event Templates
      {
        id: 'tech-1',
        name: 'Innovation Tech',
        description: 'Technology innovation and development',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_7nirgx7nirgx7nir (1).png',
        layout: {
          titlePosition: { top: '15%', fontSize: '50px' },
          contentArea: { top: '30%', height: '40%' },
          signatureArea: { top: '79%', layout: 'horizontal' },
          signatures: [
            { position: { left: '15%', top: '84%' }, title: 'Tech Lead' },
            { position: { left: '42.5%', top: '84%' }, title: 'Department Head' },
            { position: { left: '70%', top: '84%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'tech-2',
        name: 'Digital Excellence',
        description: 'Digital technology excellence award',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_7nirgx7nirgx7nir (2).png',
        layout: {
          titlePosition: { top: '17%', fontSize: '47px' },
          contentArea: { top: '33%', height: '37%' },
          signatureArea: { top: '81%', layout: 'horizontal' },
          signatures: [
            { position: { left: '16%', top: '86%' }, title: 'Tech Lead' },
            { position: { left: '42.5%', top: '86%' }, title: 'Department Head' },
            { position: { left: '69%', top: '86%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'tech-3',
        name: 'Coding Competition',
        description: 'Programming and coding competition',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_7nirgx7nirgx7nir (3).png',
        layout: {
          titlePosition: { top: '19%', fontSize: '45px' },
          contentArea: { top: '35%', height: '35%' },
          signatureArea: { top: '83%', layout: 'horizontal' },
          signatures: [
            { position: { left: '17%', top: '88%' }, title: 'Judge' },
            { position: { left: '42.5%', top: '88%' }, title: 'Event Coordinator' },
            { position: { left: '68%', top: '88%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'tech-4',
        name: 'Tech Conference',
        description: 'Technology conference participation',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_7nirgx7nirgx7nir (4).png',
        layout: {
          titlePosition: { top: '14%', fontSize: '49px' },
          contentArea: { top: '29%', height: '42%' },
          signatureArea: { top: '80%', layout: 'horizontal' },
          signatures: [
            { position: { left: '14%', top: '85%' }, title: 'Conference Chair' },
            { position: { left: '42.5%', top: '85%' }, title: 'Department Head' },
            { position: { left: '71%', top: '85%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'tech-5',
        name: 'AI & ML Event',
        description: 'Artificial Intelligence and Machine Learning',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_e6ubske6ubske6ub (1).png',
        layout: {
          titlePosition: { top: '16%', fontSize: '48px' },
          contentArea: { top: '32%', height: '38%' },
          signatureArea: { top: '82%', layout: 'horizontal' },
          signatures: [
            { position: { left: '18%', top: '87%' }, title: 'AI Expert' },
            { position: { left: '42.5%', top: '87%' }, title: 'Department Head' },
            { position: { left: '67%', top: '87%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'tech-6',
        name: 'Cybersecurity Event',
        description: 'Cybersecurity and information security',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_i2haipi2haipi2ha.png',
        layout: {
          titlePosition: { top: '20%', fontSize: '44px' },
          contentArea: { top: '36%', height: '34%' },
          signatureArea: { top: '84%', layout: 'horizontal' },
          signatures: [
            { position: { left: '19%', top: '89%' }, title: 'Security Expert' },
            { position: { left: '42.5%', top: '89%' }, title: 'Department Head' },
            { position: { left: '66%', top: '89%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'tech-7',
        name: 'Hackathon',
        description: 'Hackathon participation and achievement',
        category: 'tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_tj0908tj0908tj09.png',
        layout: {
          titlePosition: { top: '12%', fontSize: '52px' },
          contentArea: { top: '28%', height: '44%' },
          signatureArea: { top: '78%', layout: 'horizontal' },
          signatures: [
            { position: { left: '13%', top: '83%' }, title: 'Organizer' },
            { position: { left: '42.5%', top: '83%' }, title: 'Mentor' },
            { position: { left: '72%', top: '83%' }, title: 'Director' }
          ]
        }
      },

      // Workshop Templates
      {
        id: 'workshop-1',
        name: 'Skills Workshop',
        description: 'Skill development workshop certificate',
        category: 'workshop',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_3cpza53cpza53cpz.png',
        layout: {
          titlePosition: { top: '18%', fontSize: '46px' },
          contentArea: { top: '34%', height: '36%' },
          signatureArea: { top: '82%', layout: 'horizontal' },
          signatures: [
            { position: { left: '16%', top: '87%' }, title: 'Instructor' },
            { position: { left: '42.5%', top: '87%' }, title: 'Coordinator' },
            { position: { left: '69%', top: '87%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'workshop-2',
        name: 'Creative Workshop',
        description: 'Creative arts and design workshop',
        category: 'workshop',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_3cpza53cpza53cpz (2).png',
        layout: {
          titlePosition: { top: '21%', fontSize: '43px' },
          contentArea: { top: '37%', height: '33%' },
          signatureArea: { top: '84%', layout: 'horizontal' },
          signatures: [
            { position: { left: '17%', top: '89%' }, title: 'Artist' },
            { position: { left: '42.5%', top: '89%' }, title: 'Coordinator' },
            { position: { left: '68%', top: '89%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'workshop-3',
        name: 'Professional Workshop',
        description: 'Professional development workshop',
        category: 'workshop',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_st1h5rst1h5rst1h.png',
        layout: {
          titlePosition: { top: '15%', fontSize: '48px' },
          contentArea: { top: '31%', height: '39%' },
          signatureArea: { top: '81%', layout: 'horizontal' },
          signatures: [
            { position: { left: '15%', top: '86%' }, title: 'Trainer' },
            { position: { left: '42.5%', top: '86%' }, title: 'HR Head' },
            { position: { left: '70%', top: '86%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'workshop-4',
        name: 'Technical Workshop',
        description: 'Technical skills and training workshop',
        category: 'workshop',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_st1h5rst1h5rst1h (1).png',
        layout: {
          titlePosition: { top: '19%', fontSize: '45px' },
          contentArea: { top: '35%', height: '35%' },
          signatureArea: { top: '83%', layout: 'horizontal' },
          signatures: [
            { position: { left: '18%', top: '88%' }, title: 'Technical Expert' },
            { position: { left: '42.5%', top: '88%' }, title: 'Coordinator' },
            { position: { left: '67%', top: '88%' }, title: 'Director' }
          ]
        }
      },
      {
        id: 'workshop-5',
        name: 'Leadership Workshop',
        description: 'Leadership and management workshop',
        category: 'workshop',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_st1h5rst1h5rst1h (3).png',
        layout: {
          titlePosition: { top: '22%', fontSize: '42px' },
          contentArea: { top: '38%', height: '32%' },
          signatureArea: { top: '85%', layout: 'horizontal' },
          signatures: [
            { position: { left: '19%', top: '90%' }, title: 'Leadership Coach' },
            { position: { left: '42.5%', top: '90%' }, title: 'HR Head' },
            { position: { left: '66%', top: '90%' }, title: 'Director' }
          ]
        }
      },

      // Non-Tech Event Templates
      {
        id: 'nontech-1',
        name: 'Cultural Event',
        description: 'Cultural activities and performances',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_31lk1631lk1631lk.png',
        layout: {
          titlePosition: { top: '16%', fontSize: '48px' },
          contentArea: { top: '32%', height: '38%' },
          signatureArea: { top: '81%', layout: 'horizontal' },
          signatures: [
            { position: { left: '16%', top: '86%' }, title: 'Cultural Head' },
            { position: { left: '42.5%', top: '86%' }, title: 'Event Coordinator' },
            { position: { left: '69%', top: '86%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'nontech-2',
        name: 'Arts Festival',
        description: 'Arts and creativity festival',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_31lk1631lk1631lk (1).png',
        layout: {
          titlePosition: { top: '14%', fontSize: '50px' },
          contentArea: { top: '30%', height: '40%' },
          signatureArea: { top: '79%', layout: 'horizontal' },
          signatures: [
            { position: { left: '14%', top: '84%' }, title: 'Arts Director' },
            { position: { left: '42.5%', top: '84%' }, title: 'Event Coordinator' },
            { position: { left: '71%', top: '84%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'nontech-3',
        name: 'Community Event',
        description: 'Community service and engagement',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_31lk1631lk1631lk (2).png',
        layout: {
          titlePosition: { top: '20%', fontSize: '44px' },
          contentArea: { top: '36%', height: '34%' },
          signatureArea: { top: '84%', layout: 'horizontal' },
          signatures: [
            { position: { left: '18%', top: '89%' }, title: 'Community Leader' },
            { position: { left: '42.5%', top: '89%' }, title: 'Event Coordinator' },
            { position: { left: '67%', top: '89%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'nontech-4',
        name: 'Social Event',
        description: 'Social activities and gatherings',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_31lk1631lk1631lk (3).png',
        layout: {
          titlePosition: { top: '17%', fontSize: '47px' },
          contentArea: { top: '33%', height: '37%' },
          signatureArea: { top: '82%', layout: 'horizontal' },
          signatures: [
            { position: { left: '17%', top: '87%' }, title: 'Social Coordinator' },
            { position: { left: '42.5%', top: '87%' }, title: 'Event Head' },
            { position: { left: '68%', top: '87%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'nontech-5',
        name: 'Volunteer Service',
        description: 'Volunteer work and community service',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_cq0h6dcq0h6dcq0h.png',
        layout: {
          titlePosition: { top: '19%', fontSize: '45px' },
          contentArea: { top: '35%', height: '35%' },
          signatureArea: { top: '83%', layout: 'horizontal' },
          signatures: [
            { position: { left: '19%', top: '88%' }, title: 'Volunteer Head' },
            { position: { left: '42.5%', top: '88%' }, title: 'Service Coordinator' },
            { position: { left: '66%', top: '88%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'nontech-6',
        name: 'Literary Event',
        description: 'Literature and writing competitions',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_iroe7wiroe7wiroe.png',
        layout: {
          titlePosition: { top: '13%', fontSize: '51px' },
          contentArea: { top: '29%', height: '42%' },
          signatureArea: { top: '80%', layout: 'horizontal' },
          signatures: [
            { position: { left: '15%', top: '85%' }, title: 'Literary Head' },
            { position: { left: '42.5%', top: '85%' }, title: 'English Faculty' },
            { position: { left: '70%', top: '85%' }, title: 'Principal' }
          ]
        }
      },
      {
        id: 'nontech-7',
        name: 'General Achievement',
        description: 'General achievement and recognition',
        category: 'non-tech-event',
        background: '/backgrounds/templates/converted-Gemini_Generated_Image_ti32p2ti32p2ti32.png',
        layout: {
          titlePosition: { top: '23%', fontSize: '41px' },
          contentArea: { top: '39%', height: '31%' },
          signatureArea: { top: '86%', layout: 'horizontal' },
          signatures: [
            { position: { left: '20%', top: '91%' }, title: 'Coordinator' },
            { position: { left: '42.5%', top: '91%' }, title: 'Faculty Head' },
            { position: { left: '65%', top: '91%' }, title: 'Principal' }
          ]
        }
      }
    ];
    
    this.currentTemplate = null;
    this.initializeUI();
  }

  // Initialize template UI elements
  initializeUI() {
    this.createTemplateModal();
    this.bindEvents();
  }

  // Create template selection modal
  createTemplateModal() {
    const modal = document.createElement('div');
    modal.id = 'template-modal';
    modal.className = 'template-modal';
    modal.innerHTML = `
      <div class="template-modal-content">
        <div class="template-modal-header">
          <h2>Select Background Template</h2>
          <button class="template-modal-close">&times;</button>
        </div>
        <div class="template-modal-body">
          <div class="template-categories">
            <button class="template-category-btn active" data-category="all">All</button>
            <button class="template-category-btn" data-category="seminar">Seminars</button>
            <button class="template-category-btn" data-category="sports">Sports</button>
            <button class="template-category-btn" data-category="tech-event">Tech Events</button>
            <button class="template-category-btn" data-category="workshop">Workshops</button>
            <button class="template-category-btn" data-category="non-tech-event">Non-Tech Events</button>
          </div>
          <div class="template-grid" id="template-grid">
            <!-- Templates will be populated here -->
          </div>
        </div>
        <div class="template-modal-footer">
          <button class="template-btn-secondary" onclick="window.templateManager.closeModal()">Cancel</button>
          <button class="template-btn-primary" onclick="window.templateManager.uploadCustomBackground()">Upload Custom</button>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .template-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
      }

      .template-modal.show {
        display: flex;
      }

      .template-modal-content {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 900px;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      .template-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid #e5e7eb;
      }

      .template-modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
      }

      .template-modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
      }

      .template-modal-close:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .template-modal-body {
        padding: 24px;
        overflow-y: auto;
        max-height: 60vh;
      }

      .template-categories {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      .template-category-btn {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        transition: all 0.2s;
      }

      .template-category-btn:hover {
        background: #f9fafb;
        border-color: #9ca3af;
      }

      .template-category-btn.active {
        background: #3b82f6;
        border-color: #3b82f6;
        color: white;
      }

      .template-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }

      .template-item {
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
      }

      .template-item:hover {
        border-color: #3b82f6;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
      }

      .template-item.selected {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .template-preview {
        width: 100%;
        height: 120px;
        object-fit: cover;
        background: #f3f4f6;
        border-radius: 4px 4px 0 0;
      }

      .template-preview-fallback {
        width: 100%;
        height: 120px;
        background: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6b7280;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px 4px 0 0;
      }

      .template-info {
        padding: 12px;
      }

      .template-name {
        font-weight: 600;
        font-size: 14px;
        color: #1f2937;
        margin-bottom: 4px;
      }

      .template-description {
        font-size: 12px;
        color: #6b7280;
        line-height: 1.4;
      }

      .template-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 20px 24px;
        border-top: 1px solid #e5e7eb;
        background: #f9fafb;
      }

      .template-btn-secondary {
        padding: 8px 16px;
        border: 1px solid #d1d5db;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
      }

      .template-btn-secondary:hover {
        background: #f9fafb;
      }

      .template-btn-primary {
        padding: 8px 16px;
        border: none;
        background: #3b82f6;
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }

      .template-btn-primary:hover {
        background: #2563eb;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);
  }

  // Bind event listeners
  bindEvents() {
    const modal = document.getElementById('template-modal');
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Close button
    modal.querySelector('.template-modal-close').addEventListener('click', () => {
      this.closeModal();
    });

    // Category filter buttons
    modal.querySelectorAll('.template-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterTemplates(category);
        
        // Update active category
        modal.querySelectorAll('.template-category-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  // Show template selection modal
  showModal() {
    const modal = document.getElementById('template-modal');
    modal.classList.add('show');
    this.populateTemplates();
  }

  // Hide template selection modal
  closeModal() {
    const modal = document.getElementById('template-modal');
    modal.classList.remove('show');
  }

  // Populate templates in the grid
  populateTemplates(category = 'all') {
    const grid = document.getElementById('template-grid');
    const filteredTemplates = category === 'all' 
      ? this.templates 
      : this.templates.filter(t => t.category === category);

    grid.innerHTML = filteredTemplates.map(template => `
      <div class="template-item" data-template="${template.id}">
        <img src="${template.background}" alt="${template.name}" class="template-preview" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="template-preview-fallback" style="display:none;">
          ${template.name}
        </div>
        <div class="template-info">
          <div class="template-name">${template.name}</div>
          <div class="template-description">${template.description}</div>
        </div>
      </div>
    `).join('');

    // Add click handlers for template selection
    grid.querySelectorAll('.template-item').forEach(item => {
      item.addEventListener('click', () => {
        const templateId = item.dataset.template;
        this.selectTemplate(templateId);
      });
    });
  }

  // Filter templates by category
  filterTemplates(category) {
    this.populateTemplates(category);
  }

  // Select and apply a template
  selectTemplate(templateId) {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return;

    // Update UI selection
    document.querySelectorAll('.template-item').forEach(item => {
      item.classList.remove('selected');
    });
    document.querySelector(`[data-template="${templateId}"]`).classList.add('selected');

    // Apply the template background
    this.applyTemplate(template);
    this.currentTemplate = template;
    
    // Close modal after selection
    setTimeout(() => this.closeModal(), 300);
  }

  // Apply template background to canvas
  applyTemplate(template) {
    // Check if the background image exists, otherwise use a generated background
    if (window.setBackgroundImage) {
      // Try to load the template background
      const img = new Image();
      img.onload = () => {
        console.log('✅ Template image loaded successfully:', template.background);
        window.setBackgroundImage(template.background);
        // Create editable template element after background is loaded
        setTimeout(() => {
          this.createEditableTemplateElement(template);
          this.applyTemplateLayout(template);
        }, 300);
      };
      img.onerror = () => {
        console.warn('⚠️ Template image failed to load, using placeholder:', template.background);
        // If image doesn't exist, generate a placeholder background
        this.generatePlaceholderBackground(template);
        // Create editable template element and apply layout adjustments with a small delay
        setTimeout(() => {
          this.createEditableTemplateElement(template);
          this.applyTemplateLayout(template);
        }, 300);
      };
      
      // Add timeout for slow loading images
      setTimeout(() => {
        if (!img.complete) {
          console.warn('⏱️ Template image loading timeout, using placeholder:', template.background);
          img.onerror();
        }
      }, 5000);
      
      img.src = template.background;
    }
  }

  // Create an editable template element that can be manipulated
  createEditableTemplateElement(template) {
    // Remove any existing template element
    const existingTemplate = document.getElementById('editable-template-element');
    if (existingTemplate) {
      existingTemplate.remove();
    }

    // Verify image path and use fallback if needed
    const imagePath = template.background;
    const fallbackImage = this.createFallbackImageData(template);

    // Create template element wrapper
    const templateElement = document.createElement('div');
    templateElement.id = 'editable-template-element';
    templateElement.className = 'dynamic-element template-element';
    templateElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('${imagePath}'), ${fallbackImage};
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      cursor: move;
      z-index: 1;
      border: 2px dashed transparent;
      transition: all 0.3s ease;
    `;

    // Test if the main image loads, if not, use fallback
    const testImg = new Image();
    testImg.onerror = () => {
      console.warn('🔄 Using fallback background for template:', template.name);
      templateElement.style.backgroundImage = fallbackImage;
    };
    testImg.src = imagePath;

    // Add hover and selection effects
    templateElement.addEventListener('mouseenter', () => {
      if (!templateElement.classList.contains('selected')) {
        templateElement.style.border = '2px dashed rgba(0, 123, 255, 0.5)';
      }
    });

    templateElement.addEventListener('mouseleave', () => {
      if (!templateElement.classList.contains('selected')) {
        templateElement.style.border = '2px dashed transparent';
      }
    });

    // Add click selection
    templateElement.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.selectElement) {
        window.selectElement(templateElement);
      }
    });

    // Add double-click to replace template
    templateElement.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      this.replaceTemplateBackground(templateElement);
    });

    // Add right-click context menu
    templateElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showTemplateContextMenu(e, templateElement);
    });

    // Add template info overlay (optional)
    const infoOverlay = document.createElement('div');
    infoOverlay.className = 'template-info-overlay';
    infoOverlay.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 2;
    `;
    infoOverlay.textContent = `Template: ${template.name}`;
    templateElement.appendChild(infoOverlay);

    // Show info on hover
    templateElement.addEventListener('mouseenter', () => {
      infoOverlay.style.opacity = '1';
    });
    templateElement.addEventListener('mouseleave', () => {
      infoOverlay.style.opacity = '0';
    });

    // Add to container
    const container = document.getElementById('dynamic-elements-container');
    if (container) {
      container.appendChild(templateElement);
    }

    // Make the template element draggable
    if (window.makeElementDraggable) {
      window.makeElementDraggable(templateElement);
    }

    // Store template reference
    templateElement.templateData = template;

    return templateElement;
  }

  // Replace template background with new image
  replaceTemplateBackground(templateElement) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImageSrc = e.target.result;
          templateElement.style.backgroundImage = `url('${newImageSrc}')`;
          
          // Update template data
          if (templateElement.templateData) {
            templateElement.templateData.background = newImageSrc;
          }
          
          // Update canvas background as well
          if (window.setBackgroundImage) {
            window.setBackgroundImage(newImageSrc);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  // Show context menu for template element
  showTemplateContextMenu(event, templateElement) {
    // Remove existing context menu
    const existingMenu = document.getElementById('template-context-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    const contextMenu = document.createElement('div');
    contextMenu.id = 'template-context-menu';
    contextMenu.style.cssText = `
      position: fixed;
      top: ${event.clientY}px;
      left: ${event.clientX}px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10000;
      padding: 5px 0;
      min-width: 150px;
    `;

    const menuItems = [
      { text: 'Replace Template', action: () => this.replaceTemplateBackground(templateElement) },
      { text: 'Adjust Opacity', action: () => this.adjustTemplateOpacity(templateElement) },
      { text: 'Bring to Front', action: () => templateElement.style.zIndex = '999' },
      { text: 'Send to Back', action: () => templateElement.style.zIndex = '1' },
      { text: 'Remove Template', action: () => this.removeTemplateElement(templateElement) }
    ];

    menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.textContent = item.text;
      menuItem.style.cssText = `
        padding: 8px 15px;
        cursor: pointer;
        hover: background-color: #f5f5f5;
      `;
      menuItem.addEventListener('mouseenter', () => {
        menuItem.style.backgroundColor = '#f5f5f5';
      });
      menuItem.addEventListener('mouseleave', () => {
        menuItem.style.backgroundColor = 'transparent';
      });
      menuItem.addEventListener('click', () => {
        item.action();
        contextMenu.remove();
      });
      contextMenu.appendChild(menuItem);
    });

    document.body.appendChild(contextMenu);

    // Remove context menu when clicking elsewhere
    const removeMenu = (e) => {
      if (!contextMenu.contains(e.target)) {
        contextMenu.remove();
        document.removeEventListener('click', removeMenu);
      }
    };
    setTimeout(() => document.addEventListener('click', removeMenu), 0);
  }

  // Adjust template opacity
  adjustTemplateOpacity(templateElement) {
    const currentOpacity = templateElement.style.opacity || '1';
    const newOpacity = prompt('Enter opacity (0-1):', currentOpacity);
    if (newOpacity !== null && !isNaN(newOpacity) && newOpacity >= 0 && newOpacity <= 1) {
      templateElement.style.opacity = newOpacity;
    }
  }

  // Remove template element
  removeTemplateElement(templateElement) {
    if (confirm('Are you sure you want to remove this template?')) {
      templateElement.remove();
      
      // Reset to default background
      if (window.resetBackground) {
        window.resetBackground();
      }
      
      // Reset layout
      this.resetTemplateLayout();
    }
  }

  // Apply template-specific layout adjustments
  applyTemplateLayout(template) {
    if (!template.layout) return;

    const layout = template.layout;

    // Adjust title positioning and styling
    this.adjustTitleLayout(layout.titlePosition);

    // Adjust content area
    this.adjustContentArea(layout.contentArea);

    // Adjust signature area and positions
    this.adjustSignatureLayout(layout.signatures);

    // Store current template layout for future reference
    window.currentTemplateLayout = layout;
  }

  // Adjust title positioning
  adjustTitleLayout(titleConfig) {
    if (!titleConfig) return;

    // Find and adjust main title elements
    const titles = document.querySelectorAll('.certificate-content h1, .certificate-content .title-main');
    titles.forEach(title => {
      if (titleConfig.top) title.style.top = titleConfig.top;
      if (titleConfig.fontSize) title.style.fontSize = titleConfig.fontSize;
      title.style.position = 'relative';
      title.style.textAlign = 'center';
      title.style.marginTop = titleConfig.top || '15%';
    });
  }

  // Adjust content area positioning
  adjustContentArea(contentConfig) {
    if (!contentConfig) return;

    const contentArea = document.querySelector('.certificate-content');
    if (contentArea) {
      if (contentConfig.top) {
        contentArea.style.paddingTop = contentConfig.top;
      }
      if (contentConfig.height) {
        contentArea.style.minHeight = contentConfig.height;
      }
    }
  }

  // Adjust signature layout and positioning
  adjustSignatureLayout(signatures) {
    if (!signatures || !Array.isArray(signatures)) return;

    const signatureBlocks = document.querySelectorAll('.signature-block');
    const footer = document.querySelector('.footer-content');
    
    // Switch footer to relative positioning for absolute children
    if (footer) {
      footer.style.position = 'relative';
      footer.style.display = 'block'; // Change from flex to block for absolute positioning
      footer.style.height = '150px'; // Fixed height for signature area
      footer.style.marginTop = 'auto';
    }
    
    signatures.forEach((sigConfig, index) => {
      if (signatureBlocks[index]) {
        const block = signatureBlocks[index];
        
        // Add template positioning class
        block.classList.add('template-positioned');
        
        // Position the signature block
        if (sigConfig.position) {
          if (sigConfig.position.left) block.style.left = sigConfig.position.left;
          if (sigConfig.position.top) block.style.top = sigConfig.position.top;
          if (sigConfig.position.right) block.style.right = sigConfig.position.right;
          if (sigConfig.position.bottom) block.style.bottom = sigConfig.position.bottom;
        }

        // Update title if provided
        if (sigConfig.title) {
          const titleElement = block.querySelector('.title');
          if (titleElement) {
            titleElement.textContent = sigConfig.title;
          }
        }

        // Style adjustments for better positioning
        block.style.textAlign = 'center';
        block.style.fontSize = '13px';
        block.style.transform = 'translateX(-50%)'; // Center horizontally
      }
    });
  }

  // Generate placeholder background when template image doesn't exist
  generatePlaceholderBackground(template) {
    const canvas = document.createElement('canvas');
    canvas.width = 2480;  // A4 width at 300 DPI
    canvas.height = 3508; // A4 height at 300 DPI
    const ctx = canvas.getContext('2d');

    // Create different backgrounds based on template type
    switch (template.id) {
      case 'academic-blue':
        this.drawAcademicBlueBackground(ctx, canvas);
        break;
      case 'corporate-gold':
        this.drawCorporateGoldBackground(ctx, canvas);
        break;
      case 'modern-gradient':
        this.drawModernGradientBackground(ctx, canvas);
        break;
      case 'classic-border':
        this.drawClassicBorderBackground(ctx, canvas);
        break;
      case 'simple-white':
        this.drawSimpleWhiteBackground(ctx, canvas);
        break;
      default:
        this.drawDefaultBackground(ctx, canvas);
    }

    // Apply the generated background
    const backgroundDataUrl = canvas.toDataURL();
    if (window.setBackgroundImage) {
      window.setBackgroundImage(backgroundDataUrl);
    }
  }

  // Background drawing functions
  drawAcademicBlueBackground(ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#3b82f6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative border (scaled for A4)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 24; // Scaled from 8
    ctx.strokeRect(120, 120, canvas.width - 240, canvas.height - 240);
  }

  drawCorporateGoldBackground(ctx, canvas) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold border (scaled for A4)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 36; // Scaled from 12
    ctx.strokeRect(90, 90, canvas.width - 180, canvas.height - 180);

    // Inner border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 12; // Scaled from 4
    ctx.strokeRect(150, 150, canvas.width - 300, canvas.height - 300);
  }

  drawModernGradientBackground(ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(0.5, '#3b82f6');
    gradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawClassicBorderBackground(ctx, canvas) {
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Classic decorative border (scaled for A4)
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 18; // Scaled from 6
    ctx.strokeRect(180, 180, canvas.width - 360, canvas.height - 360);

    // Corner decorations (scaled for A4)
    const cornerSize = 120; // Scaled from 40
    ctx.fillStyle = '#374151';
    // Top-left
    ctx.fillRect(120, 120, cornerSize, cornerSize);
    // Top-right
    ctx.fillRect(canvas.width - 240, 120, cornerSize, cornerSize);
    // Bottom-left
    ctx.fillRect(120, canvas.height - 240, cornerSize, cornerSize);
    // Bottom-right
    ctx.fillRect(canvas.width - 240, canvas.height - 240, cornerSize, cornerSize);
  }

  drawSimpleWhiteBackground(ctx, canvas) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle border (scaled for A4)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 6; // Scaled from 2
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
  }

  drawDefaultBackground(ctx, canvas) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Upload custom background
  uploadCustomBackground() {
    this.closeModal();
    if (window.triggerBackgroundUpload) {
      window.triggerBackgroundUpload();
    }
  }

  // Get current template
  getCurrentTemplate() {
    return this.currentTemplate;
  }

  // Reset to default background
  resetBackground() {
    this.currentTemplate = null;
    this.resetTemplateLayout(); // Reset layout when background is reset
    if (window.resetBackground) {
      window.resetBackground();
    }
  }

  // Reset template layout to default
  resetTemplateLayout() {
    // Remove template positioning classes
    const signatureBlocks = document.querySelectorAll('.signature-block');
    signatureBlocks.forEach(block => {
      block.classList.remove('template-positioned');
      block.style.position = '';
      block.style.left = '';
      block.style.top = '';
      block.style.right = '';
      block.style.bottom = '';
      block.style.transform = '';
      block.style.textAlign = '';
      block.style.fontSize = '';
    });

    // Reset footer to default flex layout
    const footer = document.querySelector('.footer-content');
    if (footer) {
      footer.style.position = '';
      footer.style.display = 'flex';
      footer.style.height = '';
      footer.style.marginTop = 'auto';
    }

    // Reset titles to default
    const titles = document.querySelectorAll('.certificate-content h1, .certificate-content .title-main');
    titles.forEach(title => {
      title.style.top = '';
      title.style.fontSize = '';
      title.style.position = '';
      title.style.marginTop = '';
    });

    // Reset signature titles to default
    const signatureTitles = document.querySelectorAll('.signature-block .title');
    signatureTitles.forEach((title, index) => {
      const defaultTitles = ['Organizer', 'Head of Department', 'Principal'];
      title.textContent = defaultTitles[index] || 'Authority';
    });

    // Clear stored layout
    delete window.currentTemplateLayout;
  }

  // Create fallback image data URL for CSS background
  createFallbackImageData(template) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Create a simple gradient based on template category
    const gradients = {
      'seminar': ['#e3f2fd', '#1976d2'],
      'sports': ['#e8f5e8', '#388e3c'],
      'tech': ['#f3e5f5', '#7b1fa2'],
      'workshop': ['#fff3e0', '#f57c00'],
      'non-tech': ['#fce4ec', '#c2185b']
    };

    const colors = gradients[template.category] || ['#f5f5f5', '#9e9e9e'];
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern
    ctx.fillStyle = colors[1];
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < canvas.width; i += 50) {
      for (let j = 0; j < canvas.height; j += 50) {
        ctx.fillRect(i, j, 20, 20);
      }
    }

    return `url('${canvas.toDataURL()}')`;
  }
}

// Initialize template manager when the page loads
window.addEventListener('DOMContentLoaded', () => {
  window.templateManager = new TemplateManager();
});

// Expose to global scope
window.TemplateManager = TemplateManager;
