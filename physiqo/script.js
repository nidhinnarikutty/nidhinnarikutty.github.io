const menuBtn=document.getElementById('menuBtn');const mobileMenu=document.getElementById('mobileMenu');menuBtn?.addEventListener('click',()=>mobileMenu.classList.toggle('open'));document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.getElementById('bmiBtn').addEventListener('click',()=>{const h=+document.getElementById('bmiHeight').value/100,w=+document.getElementById('bmiWeight').value,out=document.getElementById('bmiResult');if(!h||!w){out.textContent='Please enter valid height and weight.';return}const bmi=w/(h*h);let cat=bmi<18.5?'Underweight':bmi<25?'General healthy range':bmi<30?'Overweight range':'Obesity range';out.innerHTML=`Estimated BMI: <strong>${bmi.toFixed(1)}</strong> — ${cat}`});

document.getElementById('calBtn').addEventListener('click',()=>{const age=+document.getElementById('calAge').value,gender=document.getElementById('calGender').value,h=+document.getElementById('calHeight').value,w=+document.getElementById('calWeight').value,activity=+document.getElementById('calActivity').value,goal=+document.getElementById('calGoal').value,out=document.getElementById('calResult');if(!age||!h||!w){out.textContent='Please enter age, height and weight.';return}let bmr=10*w+6.25*h-5*age+(gender==='male'?5:-161);let tdee=bmr*activity,target=Math.round(tdee+goal),proteinLow=Math.round(w*1.6),proteinHigh=Math.round(w*2.0);out.innerHTML=`Estimated target: <strong>${target} kcal/day</strong><br>Estimated protein: <strong>${proteinLow}–${proteinHigh} g/day</strong>`});

let step=1;const steps=[...document.querySelectorAll('.form-step')],stepLabel=document.getElementById('stepLabel'),progressBar=document.getElementById('progressBar');function showStep(n){step=n;steps.forEach(s=>s.classList.toggle('active',+s.dataset.step===n));stepLabel.textContent=`Step ${n} of 3`;progressBar.style.width=`${n/3*100}%`}document.querySelectorAll('.next-btn').forEach(btn=>btn.addEventListener('click',()=>{const current=steps.find(s=>+s.dataset.step===step);const req=[...current.querySelectorAll('[required]')];if(req.some(i=>!i.value)){req.find(i=>!i.value)?.focus();return}showStep(Math.min(3,step+1))}));document.querySelectorAll('.prev-btn').forEach(btn=>btn.addEventListener('click',()=>showStep(Math.max(1,step-1))));

const ASSESSMENT_WEBHOOK='https://nidhin281200.app.n8n.cloud/webhook-test/f13e3bf8-845c-4ded-9447-1fb24dcf2eb2';

document.getElementById('assessmentForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget;
  const fd=new FormData(form);
  const submitBtn=form.querySelector('button[type="submit"]');
  const originalText=submitBtn.textContent;
  submitBtn.disabled=true;
  submitBtn.textContent='Sending...';

  const payload={
    firstName:fd.get('firstName')||'',
    age:fd.get('age')||'',
    height:fd.get('height')||'',
    weight:fd.get('weight')||'',
    location:fd.get('location')||'',
    goal:fd.get('goal')||'',
    training:fd.get('training')||'',
    experience:fd.get('experience')||'',
    challenge:fd.get('challenge')||'',
    whatsapp:fd.get('whatsapp')||'',
    email:fd.get('email')||'',
    target:fd.get('target')||'',
    source:'Physiqo Website - Free Fitness Assessment',
    pageUrl:window.location.href,
    submittedAt:new Date().toISOString()
  };

  try{
    const response=await fetch(ASSESSMENT_WEBHOOK,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
    if(!response.ok)throw new Error(`Webhook returned ${response.status}`);

    const first=payload.firstName,goal=payload.goal;
    const msg=`Hi Physiqo, I completed my free fitness assessment. My name is ${first} and my main goal is ${goal}. I would like to continue.`;
    document.getElementById('waContinue').href=`https://wa.me/919061755675?text=${encodeURIComponent(msg)}`;
    steps.forEach(s=>s.classList.remove('active'));
    document.querySelector('.form-progress').style.display='none';
    document.getElementById('formSuccess').classList.add('show');
  }catch(error){
    console.error('Assessment webhook error:',error);
    alert('We could not send your assessment right now. Please try again.');
  }finally{
    submitBtn.disabled=false;
    submitBtn.textContent=originalText;
  }
});

const langBtn=document.getElementById('langToggle');let ar=false;langBtn.addEventListener('click',()=>{ar=!ar;document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.lang=ar?'ar':'en';langBtn.textContent=ar?'English':'العربية';document.querySelector('.hero-copy .eyebrow').textContent=ar?'تدريب لياقة شخصي • قطر':'PERSONALISED FITNESS COACHING • QATAR';document.querySelector('.lead').textContent=ar?'تدريب وتغذية ومتابعة وقياس تقدم — مصممة حسب جسمك ونمط حياتك وهدفك.':'Training, nutrition, accountability and progress tracking — built around your body, lifestyle and goals.'});