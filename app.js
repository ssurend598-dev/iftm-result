const fallbackUrl='data/results.json';
let db=null;
async function loadData(){
  try{
    const res=await fetch('data/results.xlsx');
    if(!res.ok) throw new Error('xlsx not found');
    const buf=await res.arrayBuffer();
    const wb=XLSX.read(buf,{type:'array'});
    db={};
    wb.SheetNames.forEach(name=>{
      const rows=XLSX.utils.sheet_to_json(wb.Sheets[name],{header:1,defval:null});
      const meta={};
      rows.slice(3,11).forEach(r=>{if(r[0])meta[String(r[0]).trim()]=r[1]});
      const subjects=rows.slice(13,19).map(r=>({code:r[0],subject:r[1],theory:r[2],internal:r[3],total:r[4],max:r[5],min:r[6]}));
      const t=rows[19], g=rows[21];
      db[name]={session:rows[1][0],name:meta['Name of Student'],father:meta["Father's Name"],roll:meta['Roll No.'],reg:meta['Regd. No.'],course:meta['Course'],subject:meta['Subject'],college:meta['College/Institution'],dob:meta['Date of Birth'],subjects,total:t[4],max_total:t[5],min_total:t[6],grand_total:g[1],final_result:g[4]};
    });
  }catch(e){
    const res=await fetch(fallbackUrl); db=await res.json();
  }
}
function set(id,v){document.getElementById(id).textContent=v??''}
function showResult(r){
  set('sessionText',r.session); set('rName',r.name); set('rFather',r.father); set('rRoll',r.roll); set('rReg',r.reg); set('rDob',r.dob); set('rCourse',r.course); set('rCollege',r.college);
  const body=document.getElementById('marksBody'); body.innerHTML='';
  r.subjects.forEach(s=>{const tr=document.createElement('tr'); [s.code,s.subject,s.theory,s.internal,s.total,s.max,s.min].forEach((v,i)=>{const td=document.createElement('td');td.textContent=v??'';tr.appendChild(td)});body.appendChild(tr)});
  set('total',r.total);set('maxTotal',r.max_total);set('minTotal',r.min_total);set('grandTotal',r.grand_total);set('finalResult',r.final_result);
  document.getElementById('searchBox').classList.add('hidden');document.getElementById('resultCard').classList.remove('hidden');window.scrollTo({top:80,behavior:'smooth'});
}
document.getElementById('resultForm').addEventListener('submit',async e=>{
  e.preventDefault(); const msg=document.getElementById('message'); msg.textContent='Loading...';
  if(!db) await loadData();
  const roll=document.getElementById('roll').value.trim().toUpperCase();
  const reg=document.getElementById('reg').value.trim().toUpperCase();
  const dob=document.getElementById('dob').value.trim();
  const session=document.getElementById('session').value;
  const r=db[session];
  if(!r || r.roll.toUpperCase()!==roll || (reg && r.reg.toUpperCase()!==reg) || (dob && dob!==r.dob)){
    msg.textContent='Result not found. Please check Roll No., Registration No. or Date of Birth.';
    return;
  }
  msg.textContent=''; showResult(r);
});
document.getElementById('backBtn').addEventListener('click',()=>{document.getElementById('resultCard').classList.add('hidden');document.getElementById('searchBox').classList.remove('hidden');window.scrollTo({top:80,behavior:'smooth'})});
loadData();
