import React from 'react'
import { useState } from 'react'
import Lottie,{} from 'lottie-react'
import diabann from "../assets/diabann.json"
import heartann from "../assets/heartanm.json"
import parkann from '../assets/parkann.json'
import alertanim from "../assets/alertanim.json"
import happyanm from "../assets/happyanm.json"
import axios from "axios"
import jsPDF from 'jspdf';

function Prediction() {
    const [age,setage]=useState()
    const [ondiabetes,setondiabetes]= useState(true)
    const [onparkinsons,setonparkinsons]= useState(false)
    const [onheart,setonheart]= useState(false)
    const [gender,setgender]=useState("")
    const [hypertension,sethypertension]=useState("")
    const [heartdis,setheartdis]=useState("")
    const [bmi,setbmi]=useState()
    const [hb1c,sethb1c]=useState()
    const [bldglc,setbldglc]=useState()
    const [diapredict,setdiapredict]=useState()
    const [parkpredict,setparkpredict]=useState()
    const [heartpredict,setheartpredict]=useState()
    const [ondiapredict,setondiapredict]=useState(false)
    const [onheartpredict,setonheartpredict]=useState(false)
    const [onparkpredict,setonparkpredict]=useState(false)
    const [bmihrt,setbmihrt]=useState()
    const [smoking,setsmoking]=useState("")
    const [drinking,setdrinking]=useState("")
    const [stroke,setstroke]=useState("")
    const [diffwalk,setdiffwalk]=useState("")
    const [diahrt,setdiahrt]=useState("")
    const [phyact,setphyact]=useState("")
    const [asthma,setasthma]=useState("")
    const [kiddis,setkiddis]=useState("")
    const [agehrt,setagehrt]=useState()
    const [sleep,setsleep]=useState()
    const [hrtgender,sethrtgender]=useState("")
    const [parkspec,setparkspec]=useState({ "MDVPFo": "", "MDVP-Fhi": "", "MDVP-Flo": "", "MDVP-Jitter(%)": "", "MDVP-Jitter(Abs)": "", "MDVP-RAP": "", "MDVP-PPQ": "", "Jitter-DDP": "", "MDVP-Shimmer": "", "MDVP-Shimmer(dB)": "", "Shimmer-APQ3": "", "Shimmer-APQ5": "", "MDVP-APQ": "", "Shimmer-DDA": "","NHR":"", "HNR": "", "RPDE": "", "'DFA": "", "spread1": "", "spread2": "", "D2": "", "PPE": "" })
    console.log(gender);
    const ondiabetesclick= ()=>{
     setondiabetes(true)
     setonheart(false)
     setonparkinsons(false)
    }

    const handelhypertensionselect=(e)=>{
        sethypertension(e.target.value)
    }

    const onparkinsonsclick=()=>{
        setondiabetes(false)
        setonheart(false)
        setonparkinsons(true)
    }

    const onheartclick=()=>{
        setondiabetes(false)
        setonheart(true)
        setonparkinsons(false)
    }

    const handelgenderselect=(e)=>{
         setgender(e.target.value)
         
    }

    const diabetesprediction=async()=>{
        console.log("inside dib");
        var gen, hyper ,hea
        if(gender==="male"){gen=1}else{gen=0}
        if(hypertension==="yes"){hyper=1}else{hyper=0}
        if(heartdis==="yes"){hea=1}else{hea=0}
        const  data={
            gender: gen,
            age: age,
            hypertension:hyper, 
            heart_disease:hea,
            BMI:bmi,
            Hb1c_level:hb1c,
            Blood_glucose:bldglc
           }
           console.log(data);
         const response= await axios.post("http://127.0.0.1:5000/predict/diabetes",data)
         setdiapredict(response.data.prediction)
         setondiapredict(true)
    }


const heartprediction=async()=>{
    var smk,alc,stk,diff,gen,dia,phy,ast,kid
    if(smoking==="yes"){smk=1}else{smk=0}
    if(drinking==="yes"){alc=1}else{alc=0}
    if(stroke==="yes"){stk=1}else{stk=0}
    if(diffwalk==="yes"){diff=1}else{diff=0}
    if(diahrt==="yes"){dia=1}else{dia=0}
    if(phyact==="yes"){phy=1}else{phy=0}
    if(asthma==="yes"){ast=1}else{ast=0}
    if(kiddis==="yes"){kid=1}else{kid=0}
    if(hrtgender==="male"){gen=1}else{gen=0}
    const data={
       bmi:bmihrt,
       smoking:smk,
       drinking:alc,
       stroke:stk,
       difficult:diff,
       sex:gen,
       diabitic:dia,
       physical:phy,
       sleeptime:sleep,
       asthma:ast,
       kideny:kid,
       age:agehrt
    }
    const response= await axios.post("http://127.0.0.1:5000/predict/heartdisease",data)
    setheartpredict(response.data.prediction)
    setonheartpredict(true)
}


const parkprediction=async()=>{
    const response= await axios.post("http://127.0.0.1:5000/predict/parkinsons",parkspec)
    setparkpredict(response.data.prediction)
    setonparkpredict(true)
}

const createPdf = (prediction) => {
    console.log(prediction);
   var wprediction
    if(prediction==="PARKINSON'S DISEASE"){
        wprediction=parkpredict
        var obj ={...parkspec}
    }
    else if(prediction==="HEART DISEASE"){
        wprediction=heartpredict
        var obj={
            "BMI": bmihrt,
            "Smoking": smoking,
            "AlcoholDrinking": drinking,
            "stroke": stroke,
            "Difficulty in Walking": diffwalk,
            "Sex": hrtgender,
            "Diabetic": diahrt,
            "Physical Activity": phyact,
            "Sleep Time": sleep,
            "Asthma": asthma,
            "KidneyDisease": kiddis
          }
    }
    else if(prediction==="DIABETES"){
        console.log(gender,age,heartdis);
        wprediction=diapredict
         var obj={
            "Gender": gender,
            "Age": age,
            "Hypertension": hypertension,
            "Heart Disease": heartdis,
            "BMI": bmi,
            "Hb1c Level": hb1c,
            "Blood Glucose": bldglc
          }
    }
    const pdf = new jsPDF();
  
    // Add logo
    /*const logo = new Image();
    logo.src = '../assets/mainicon.png'; // Replace 'path_to_your_logo.jpg' with the actual path to your logo
    pdf.addImage(logo, 'PNG', 20, 20, 50, 50);
  */
    // Main page heading
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold')

    pdf.text(` REPORT FOR ${prediction} PREDICTION`, 20, 40);
  
    // Horizontal line
    pdf.setLineWidth(0.5);
    pdf.line(20, 60, 190, 60);
  
    // Attributes
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    let yPos = 70;
    Object.keys(obj).map((key, index) => {
    pdf.text(`${key}`, 20, yPos)
    yPos += 10
})

    pdf.setFont('helvetica', 'normal');
    yPos = 70;
    Object.keys(obj).map((key, index) => {
    pdf.text(`${obj[key]}`, 80,  yPos)
    yPos += 10
})
    // Horizontal line
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos, 190,yPos);
  
    // Subheading
    pdf.setFontSize(18);
    pdf.text('Result', 20, yPos + 10);
  
    // Result text
    pdf.setFontSize(14);
    if(wprediction===1){
        pdf.text(` According to prediction you have ${prediction} `, 20, yPos + 20);
    }
    else if(wprediction===0){
        pdf.text(`According to prediction you don't have ${prediction} `, 20, yPos + 20);
    }
  
    pdf.save(`${prediction}.pdf`);
  };
  return (
    <div className="min-h-screen dark:bg-gray-100 dark:text-gray-800">
	<div className="p-6 space-y-8">
        <div className='container flex items-center justify-between'>
         <img src="/src/assets/mainicon.svg" className=" w-16 h-16 " alt="Main Icon" />
         <div className="items-center hidden  lg:flex">
				
				<button className={`px-4 py-2 ml-8 rounded-md text-2xl ${ondiabetes===true?'border-b-4 border-indigo-100':'' }`} onClick={ondiabetesclick}>Diabetes</button>
                <button className={`px-4 py-2 ml-8 rounded-md text-2xl ${onheart===true?'border-b-4 border-indigo-100':'' }`} onClick={onheartclick}>Heart Disease</button>
                <button className={`px-4 py-2 ml-8 rounded-md text-2xl ${onparkinsons===true?'border-b-4 border-indigo-100':'' }`}onClick={onparkinsonsclick}>Parkinson's Disease</button>
                
               </div>
            <div></div>
        </div>















{ ondiabetes ===true && (
    <div>
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900 flex justify-between">
    <div className="space-y-2 col-span-full lg:col-span-1  p-4 ">
            <p className="font-medium text-3xl ml-16">Diabetes</p>
            <Lottie className='mt-4 h-96 w-80' animationData={diabann} />
        </div>
<form  className="container flex flex-col mx-auto space-y-12 w-auto p-6 bg-indigo-100 rounded-md">
    <fieldset className=" p-6 ">
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
                <label htmlFor="gender" className="text-l ">Gender</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={gender} onChange={handelgenderselect}>
               <option value="male">male</option>
               <option value="female">female</option>
               </select>           
            </div>
            <div className="col-span-full sm:col-span-3">
                <label htmlFor="Age" className="text-l">Age</label>
                <input id="Age" type="number" placeholder=""  value={age} onChange={(e)=>{setage(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2" fdprocessedid="g3nt4k" />
            </div>
            <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="text-l">Hypertension</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={hypertension} onChange={handelhypertensionselect}>
               <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="heartdis" className="text-l">Heart Disease</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={heartdis} onChange={(e)=>{setheartdis(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="bmi" className="text-l">BMI</label>
                <input id="bmi" type="number" placeholder=""  value={bmi} onChange={(e)=>{setbmi(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  />
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="hb1c" className="text-l">Hb1c Level</label>
                <input id="hb1c" type="number" placeholder=""  value={hb1c} onChange={(e)=>{sethb1c(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2" />
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="bldglc" className="text-l">blood Glucose</label>
                <input id="bldglc" type="number" placeholder=""  value={bldglc} onChange={(e)=>{setbldglc(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  />
            </div>
            
            {ondiapredict=== true && (
                <div className={`col-span-full  p-2 text-l font-mono rounded-2xl ${heartpredict===1 ? ' bg-red-200':'bg-green-100'} `}>
                 {diapredict===1 && (
                <div className='flex'>
                <Lottie className=' h-96 w-80' animationData={alertanim} /> 
                <div className='mt-12'>
                <h1 className='text-2xl text-red-700'>The results indicate that you have diabetes.</h1>
                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4"> Following tips will help you manage your diabetes effectively:</h2>
<ul class=" space-y-1 text-black list-disc list-inside ">
    <li>
    Eat a balanced diet, avoiding sugary and processed foods.
    </li>
    <li>
    Stay active with regular exercise for at least 30 minutes most days.
    </li>
    <li>
    Monitor your blood sugar levels regularly.
    </li>
    <li>
    Take your prescribed medications as directed.
    </li>
    <li>
    Manage stress through techniques like yoga, meditation, or deep breathing.
    </li>
    <li>
    Attend regular check-ups with your healthcare team.
    </li>
</ul>
                </div>
                 </div> 
               )}
               {diapredict===0 && (
                 <div className='flex'>
                 <Lottie className=' h-96 w-80' animationData={happyanm} /> 
                 <div className='mt-12'>
                 <h1 className='text-2xl text-green-700'>Congrats ! you are absolutely fine.</h1>
                 <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4"> Follow these tips effectively for healthy life:</h2>
 <ul class=" space-y-1 text-black list-disc list-inside ">
     <li>
     Eat a variety of foods, including fruits, vegetables, whole grains, and lean proteins.
     </li>
     <li>
     Aim for at least 150 minutes of moderate aerobic activity weekly, plus muscle-strengthening exercises.
     </li>
     <li>
     Get 7-9 hours of quality sleep each night.
     </li>
     <li>
     Drink plenty of water throughout the day.
     </li>
     <li>
     Practice stress-reducing techniques like yoga, meditation, or hobbies.
     </li>
 </ul>
                 </div>
                  </div>  
               )}
                 </div>
            )}
    
        </div>
    </fieldset>
</form>
</section>
<div className='text-center'>
 <button className='bg-indigo-400 p-2 mx-auto rounded-md  w-32 hover:bg-indigo-200' onClick={ diabetesprediction}> Make predction</button>
 {ondiapredict===true && (
    <button   className='bg-indigo-400 p-2 ml-4 rounded-md  w-28 hover:bg-indigo-200' onClick={()=>createPdf("DIABETES")}>createPdf</button>
 )}
 
 </div>
 </div>
)}















{ onheart===true && (
    <div>
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900 flex justify-between">
    <div className="space-y-2 col-span-full lg:col-span-1  p-4 ">
            <p className="font-medium text-3xl ml-16">Heart Disease</p>
            <Lottie className='mt-4 h-96 w-80' animationData={heartann} />
        </div>
<form  className="container flex flex-col mx-auto space-y-12 bg-indigo-100 rounded-md w-auto">
    <fieldset className=" p-6">
        
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div className="col-span-full sm:col-span-2">
                <label htmlFor="bmihrt" className="text-l">BMI</label>
                <input id="bmihrt" type="number" placeholder=""  value={bmihrt} onChange={(e)=>{setbmihrt(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  />
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="smoking" className="text-l">Smoking</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={smoking} onChange={(e)=>{setsmoking(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="alc" className="text-l">Alcohol Drinking</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={drinking} onChange={(e)=>{setdrinking(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="stroke" className="text-l">Stroke</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={stroke} onChange={(e)=>{setstroke(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="diffwalk" className="text-l">Difficulty in walking</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={diffwalk} onChange={(e)=>{setdiffwalk(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div  className="col-span-full sm:col-span-2">
                <label htmlFor="hrtgender" className="text-l ">Gender</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={hrtgender} onChange={(e)=>{sethrtgender(e.target.value)}}>
               <option value="male">male</option>
               <option value="female">female</option>
               </select>           
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="diahrt" className="text-l">Diabetic</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={diahrt} onChange={(e)=>{setdiahrt(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="phyact" className="text-l">Physical Activity</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={phyact} onChange={(e)=>{setphyact(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="sleep" className="text-l">Sleep time</label>
                <input id="sleep" type="number" placeholder=""  value={sleep} onChange={(e)=>{setsleep(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  />
            </div>
            <div className="col-span-full sm:col-span-2">
                <label htmlFor="asthma" className="text-l">Asthma</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={asthma} onChange={(e)=>{setasthma(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="kidis" className="text-l">Kideny Disease</label>
                <select  className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  value={kiddis} onChange={(e)=>{setkiddis(e.target.value)}}>
                <option value="yes">yes</option>
               <option value="no">no</option>
               </select>  
               </div>
               <div className="col-span-full sm:col-span-2">
                <label htmlFor="agehrt" className="text-l">Age</label>
                <input id="agehrt" type="number" placeholder=""  value={agehrt} onChange={(e)=>{setagehrt(e.target.value)}} className="w-full rounded-md focus:ring focus:ring-opacity-75 h-12 border-2 border-indigo-400 text-xl p-2"  />
            </div>
          
            {onheartpredict=== true && (
                <div className={`col-span-full  p-2 text-l font-mono rounded-2xl ${diapredict===1 ? ' bg-red-200':'bg-green-100'} `}>
                 {heartpredict===1 && (
                <div className='flex'>
                <Lottie className=' h-96 w-80' animationData={alertanim} /> 
                <div className='mt-12'>
                <h1 className='text-2xl text-red-700'>The results indicate that you have Heart Disease.</h1>
                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4"> Following tips will help you manage your diabetes effectively:</h2>
<ul class=" space-y-1 text-black list-disc list-inside ">
    <li>
    Eat a balanced diet, avoiding sugary and processed foods.
    </li>
    <li>
    Stay active with regular exercise for at least 30 minutes most days.
    </li>
    <li>
    Monitor your blood sugar levels regularly.
    </li>
    <li>
    Take your prescribed medications as directed.
    </li>
    <li>
    Manage stress through techniques like yoga, meditation, or deep breathing.
    </li>
    <li>
    Attend regular check-ups with your healthcare team.
    </li>
</ul>
                </div>
                 </div> 
               )}
               {heartpredict===0 && (
                 <div className='flex'>
                 <Lottie className=' h-96 w-80' animationData={happyanm} /> 
                 <div className='mt-12'>
                 <h1 className='text-2xl text-green-700'>Congrats ! you are absolutely fine.</h1>
                 <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4"> Follow these tips effectively for healthy life:</h2>
 <ul class=" space-y-1 text-black list-disc list-inside ">
     <li>
     Eat a variety of foods, including fruits, vegetables, whole grains, and lean proteins.
     </li>
     <li>
     Aim for at least 150 minutes of moderate aerobic activity weekly, plus muscle-strengthening exercises.
     </li>
     <li>
     Get 7-9 hours of quality sleep each night.
     </li>
     <li>
     Drink plenty of water throughout the day.
     </li>
     <li>
     Practice stress-reducing techniques like yoga, meditation, or hobbies.
     </li>
 </ul>
                 </div>
                  </div>  
               )}
                 </div>
            )}
        </div>
    </fieldset>
    
</form>
</section>
<div className='text-center'>
 <button className='bg-indigo-400 p-2 mx-auto rounded-md  w-32 hover:bg-indigo-200' onClick={ heartprediction}> Make predction</button>
 {onheartpredict===true && (
    <button   className='bg-indigo-400 p-2 ml-4 rounded-md  w-28 hover:bg-indigo-200' onClick={()=>createPdf("HEART DISEASE")}>createPdf</button>
 )}
 </div>
</div>
)}














{onparkinsons === true && (
    <div>
   <section className="p-6 dark:bg-gray-100 dark:text-gray-900 flex justify-between">
   <div className="space-y-2 col-span-full lg:col-span-1  p-4 ">
           <p className="font-medium text-3xl ml-16">Parkinson's Disease</p>
           <Lottie className='mt-4 h-96 w-80' animationData={parkann} />
       </div>
<form  className="container flex flex-col mx-auto space-y-12 bg-indigo-100 rounded-md w-auto">
   <fieldset className=" p-6">
       
       <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          
       {Object.keys(parkspec).map((key, index) => (
                <div className="col-span-full sm:col-span-2">
                <label htmlFor={key} className="text-l">{key}</label>
                <input id={key} type="number" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 h-8 border-2 border-indigo-400 text-xl p-2" value={parkspec[key]} onChange={(e)=>{const spec={...parkspec};spec[key]=e.target.value; setparkspec(spec) } }/>
            </div>
            ))}
           {onparkpredict=== true && (
                <div className={`col-span-full  p-2 text-l font-mono rounded-2xl ${parkpredict===1 ? ' bg-red-200':'bg-green-100'} `}>
                 {parkpredict===1 && (
                <div className='flex'>
                <Lottie className=' h-96 w-80' animationData={alertanim} /> 
                <div className='mt-12'>
                <h1 className='text-2xl text-red-700'>The results indicate that you have parkinson's disease.</h1>
                <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4"> Following tips will help you manage your diabetes effectively:</h2>
<ul class=" space-y-1 text-black list-disc list-inside ">
    <li>
    Eat a balanced diet, avoiding sugary and processed foods.
    </li>
    <li>
    Stay active with regular exercise for at least 30 minutes most days.
    </li>
    <li>
    Monitor your blood sugar levels regularly.
    </li>
    <li>
    Take your prescribed medications as directed.
    </li>
    <li>
    Manage stress through techniques like yoga, meditation, or deep breathing.
    </li>
    <li>
    Attend regular check-ups with your healthcare team.
    </li>
</ul>
                </div>
                 </div> 
               )}
               {parkpredict===0 && (
                 <div className='flex'>
                 <Lottie className=' h-96 w-80' animationData={happyanm} /> 
                 <div className='mt-12'>
                 <h1 className='text-2xl text-green-700'>Congrats ! you are absolutely fine.</h1>
                 <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white mt-4"> Follow these tips effectively for healthy life:</h2>
 <ul class=" space-y-1 text-black list-disc list-inside ">
     <li>
     Eat a variety of foods, including fruits, vegetables, whole grains, and lean proteins.
     </li>
     <li>
     Aim for at least 150 minutes of moderate aerobic activity weekly, plus muscle-strengthening exercises.
     </li>
     <li>
     Get 7-9 hours of quality sleep each night.
     </li>
     <li>
     Drink plenty of water throughout the day.
     </li>
     <li>
     Practice stress-reducing techniques like yoga, meditation, or hobbies.
     </li>
 </ul>
                 </div>
                  </div>  
               )}
                 </div>
            )}
       </div>
   </fieldset>
   
</form>
</section>
<div className='text-center'>
 <button className='bg-indigo-400 p-2 mx-auto rounded-md  w-32 hover:bg-indigo-200' onClick={ parkprediction}> Make predction</button>
 {onparkpredict===true && (
    <button   className='bg-indigo-400 p-2 ml-4 rounded-md  w-28 hover:bg-indigo-200' onClick={()=>createPdf("PARKINSON'S DISEASE")}>createPdf</button>
 )}
 </div>
 </div>
)}






    </div>
    </div>
  )
}

export default Prediction