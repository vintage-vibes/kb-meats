
    // Navigation, mobile menu and footer year
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    document.getElementById('year').textContent = new Date().getFullYear();

    function closeMenu(){
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded','false');
      toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';
    }
    toggle.addEventListener('click',()=>{
      const open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.innerHTML = open
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';
    });
    navLinks.forEach(a=>a.addEventListener('click',closeMenu));
    window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>35),{passive:true});

    // Make the reservation form usable as a mailto draft until a booking backend is connected.
    document.getElementById('booking-form').addEventListener('submit',function(e){
      e.preventDefault();
      const d = new FormData(this);
      const subject = encodeURIComponent('BBQ Table Reservation Request');
      const body = encodeURIComponent(
        'Reservation request\\n\\nName: '+d.get('name')+
        '\\nPhone: '+d.get('phone')+
        '\\nDate: '+d.get('date')+
        '\\nGuests: '+d.get('guests')+
        '\\nSpecial requests: '+(d.get('message')||'None')
      );
      document.getElementById('form-note').textContent = 'Your email app will open with your booking request. Please send the email to complete your request.';
      window.location.href = 'mailto:info@thebbq.co.za?subject='+subject+'&body='+body;
    });

    // ScrollTrigger effects. Content remains visible if the CDN is unavailable.
    window.addEventListener('load',()=>{
      if(!window.gsap || !window.ScrollTrigger){
        document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.clip-reveal').forEach(el=>{el.style.opacity=1;el.style.transform='none';el.style.clipPath='none';});
        document.querySelectorAll('.hero-reveal,.hero-line').forEach(el=>{el.style.opacity=1;el.style.transform='none';});
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.25}});
      gsap.from('.hero-line',{y:75,opacity:0,rotate:2,duration:1,stagger:.16,ease:'power4.out',delay:.15});
      gsap.from('.hero-reveal',{y:24,opacity:0,duration:.8,stagger:.13,ease:'power3.out',delay:.55});
      gsap.to('.hero-image img',{scale:1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.utils.toArray('.reveal').forEach((el)=>{
        gsap.fromTo(el,{y:38,opacity:0},{y:0,opacity:1,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
      });
      gsap.utils.toArray('.reveal-left').forEach(el=>{
        gsap.fromTo(el,{x:-55,opacity:0},{x:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%',once:true}});
      });
      gsap.utils.toArray('.reveal-right').forEach(el=>{
        gsap.fromTo(el,{x:55,opacity:0},{x:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 82%',once:true}});
      });
      gsap.utils.toArray('.menu-card').forEach((el,i)=>{
        gsap.fromTo(el,{y:45,opacity:0},{y:0,opacity:1,duration:.7,delay:i*.08,ease:'power3.out',scrollTrigger:{trigger:'.menu-grid',start:'top 82%',once:true}});
      });
      gsap.utils.toArray('[data-parallax]').forEach(img=>{
        const amount = Number(img.dataset.parallax)||.1;
        gsap.to(img,{yPercent:amount*100,ease:'none',scrollTrigger:{trigger:img.closest('section')||img,start:'top bottom',end:'bottom top',scrub:1}});
      });
      gsap.to('.fire-feature-bg img',{scale:1,ease:'none',scrollTrigger:{trigger:'.fire-feature',start:'top bottom',end:'bottom top',scrub:1}});
      gsap.utils.toArray('.gallery-item').forEach((el,i)=>{
        gsap.fromTo(el,{clipPath:'inset(12% 0 12% 0)',opacity:.4},{clipPath:'inset(0% 0 0% 0)',opacity:1,duration:.9,delay:i*.07,ease:'power2.out',scrollTrigger:{trigger:'.gallery-grid',start:'top 82%',once:true}});
      });
      const sections = ['home','story','menu','gallery','contact'].map(id=>document.getElementById(id));
      sections.forEach(section=>{
        if(!section)return;
        ScrollTrigger.create({trigger:section,start:'top 45%',end:'bottom 45%',onEnter:()=>setActive(section.id),onEnterBack:()=>setActive(section.id)});
      });
      function setActive(id){
        navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+id));
      }
      ScrollTrigger.refresh();
    });

    // Respect reduced-motion preferences by avoiding GSAP scroll animations.
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.clip-reveal').forEach(el=>{el.style.opacity=1;el.style.transform='none';el.style.clipPath='none';});
    }
  