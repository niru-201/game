var cards = document.querySelectorAll('.intial');
var cards2 = document.querySelectorAll('.intial2');
var frame = document.querySelector('.frame');
var grid = document.querySelector('.gridno');
var grid2 = document.querySelector('.grid2');
var level2 = document.getElementById('level2')
var y=1;
var ms=0,s=0,m=0;
var timer=0;
var time1= localStorage.getItem("time1");
var timep=0;
var sorts =[];
var setup;
var count=0;
var scores;
var players;
var shade=0.6;
var timetaken;
var final= document.querySelector('.final');
var inputVal =[];
var besttime =document.querySelector('.bestttime');
var stopwatch=document.querySelector('.timerclock');
var layoutt=document.querySelector('.layout');
var music= new Audio("music.mp3");
var soundclick= new Audio("click.mp3");
var flag;
var isplaying = music.currentTime>0 && !music.pause;
var isplayings = soundclick.currentTime>0 && !soundclick.pause && soundclick.ended && soundclick.readyState >2;

function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 25);
      card.style.order = ramdomPos;
      card.style.opacity= shade;
      shade+=0.01;
      localStorage.clear();
    });
  }
  shuffle();
  function shuffle2() {
    cards2.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 25);
      card.style.order = ramdomPos;
      card.style.opacity= shade;
      shade+=0.01;
    });
  }

  function randomflip(){
    cards2.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 25);
        card.style.order = ramdomPos;    
  })
}
  (function settup()
  { besttime.textContent=((Math.floor(time1/60)<10)? "0"+JSON.stringify(Math.floor(time1/60)):JSON.stringify(Math.floor(time1/60)))+":"+((Math.floor(time1%60)<10)? "0"+JSON.stringify(Math.floor(time1%60)):JSON.stringify(Math.floor(time1%60))); 
    layoutt.removeChild(grid2);
    layoutt.removeChild(grid);
    layoutt.removeChild(final);
    layoutt.removeChild(level2);
  })();
function start()
{
const playPromise = soundclick.play();
const playPromise2 =music.play();
  if (playPromise2 !== null){
    playPromise2.catch(() => { music.currentTime=0;
      music.play(); })
}
   if (playPromise !== null){
      playPromise.catch(() => {soundclick.play(); })
  }
  if(!timer){
    timer=setInterval(run,10);
  }
}
function run()
{
  stopwatch.textContent="TIME:"+(m<10? "0"+m : m)+":"+(s<10? "0"+s: s)+":"+(ms<10?"0"+ms:ms);
  ms++;
  if(ms==100)
  {ms=0;
  s++;
  }
  if(s==60)
  {s=0;
  m++;
  }
} 
function stop()
{clearInterval(timer);
  const playPromise = soundclick.play();
  const playPromise2 =music.play();
  if (playPromise !== null){
    playPromise.catch(() => {soundclick.currentTime=0;
      soundclick.play(); })
    if(playPromise2!== null){
      playPromise2.catch(() => {music.play();})
    }
}
  timer=0;
 ms=0;
 s=0;
 m=0;
 stopwatch.textContent=(m<10? "0"+m : m)+":"+(s<10? "0"+s: s)+":"+(ms<10?"0"+ms:ms);
}
function reset()
{stop();
document.location.reload();
}
function gettime(){
  timetaken =(m<10? "0"+m : m)+":"+(s<10? "0"+s: s)+":"+(ms<10?"0"+ms:ms);
  alert("timetaken :"+timetaken);
  timep += m*60 + s +ms/100.0;
}

function bestofall(){
if(time1!= null){
    if (timep < parseInt(time1)) 
        localStorage.setItem("time1",JSON.stringify(timep));      
}
else{
    localStorage.setItem("time1",JSON.stringify(timep));
    }   
  localStorage.setItem(localStorage.getItem(JSON.stringify(count)),JSON.stringify(timep));
  besttime.textContent=((Math.floor(time1/60)<10)? "0"+JSON.stringify(Math.floor(time1/60)):JSON.stringify(Math.floor(time1/60)))+":"+((Math.floor(time1%60)<10)? "0"+JSON.stringify(Math.floor(time1%60)):JSON.stringify(Math.floor(time1%60)));
  }


(function main(){
Array.from(cards).forEach(function(card){
    card.addEventListener('click',function(e){ 
      if(!isplayings){
      const playPromise = soundclick.play();
      const playPromise2 =music.play();
      if (playPromise !== null){
        playPromise.catch(() => {
          soundclick.currentTime=0;
          soundclick.play(); })}}
    if(!isplaying)
    {music.play();}
      soundclick.currentTime=0;
      soundclick.play();

     
    console.log(e.target.textContent);
    var x= e.target.textContent;
    if(e.target.textContent==y)
    {y++;
       if(parseInt(e.target.textContent)<=15)
       {e.target.textContent= parseInt(e.target.textContent)+25;
        e.target.style.opacity=shade;
        shade+=0.01;}
       else if(parseInt(e.target.textContent)==40)
       { e.target.textContent='';      
         alert("YOU COMPLETED IT!");
         gettime();
         stop();
         start2();
      }
       else
       e.target.textContent='';
    }  
    else return;
  });
});
})();
function startplay()
{ soundclick.play();
uname =JSON.stringify(document.getElementById("username").value);
if(localStorage.getItem("countt")!=null)
 count=localStorage.getItem("countt");
count++;
localStorage.setItem("countt",JSON.stringify(count));

  localStorage.setItem(JSON.stringify(count),uname);
  layoutt.removeChild(frame);
  layoutt.appendChild(grid);
   start();}
function board(){
  for(let i=1;i<=count;i++){
 players= localStorage.getItem(JSON.stringify(i));
 inputVal.push(players);
 scores=parseInt(localStorage.getItem(players));
 sorts.push(scores);
}
}

function leader(){
  stop();
  layoutt.appendChild(final);
  layoutt.removeChild(grid2);
  final.textContent+="\r\n";
  for(let j=0;j<count;j++)
    final.textContent += ("\t"+(j+1)+"."+inputVal[j]+":"+JSON.stringify(sorts[j]));
   final.textContent +="\r\n";
  sorts.sort(function(a,b){return a-b});
     final.textContent+="BEST:"
  for(let k=0;k<((sorts.length>5)?5:sorts.length);k++)
   {final.textContent += (k+1)+"."+JSON.stringify(sorts[k])+"s";
    final.textContent+= "\r\n" ;}
}
function start2(){
layoutt.removeChild(grid);
layoutt.appendChild(level2);
}
function main2(){
    y=1;
    layoutt.removeChild(level2);
    layoutt.appendChild(grid2);
    shade=0.6;
    shuffle2();
    start();
    Array.from(cards2).forEach(function(card){
        card.addEventListener('click',function(e){ 
          if(!isplayings){
          const playPromise = soundclick.play();
          const playPromise2 =music.play(); 
          if (playPromise !== null){
            playPromise.catch(() => {
              soundclick.currentTime=0;
              soundclick.play(); })}}
            if(!isplaying){
            music.play(); }
            soundclick.currentTime=0;
            soundclick.play();
         randomflip();
        console.log(e.target.textContent);
        var x= e.target.textContent;
        if(e.target.textContent==y)
        {y++;
           if(parseInt(e.target.textContent)<=15)
           {e.target.textContent= parseInt(e.target.textContent)+25;
            e.target.style.opacity=shade;
            shade+=0.01;}
           else if(parseInt(e.target.textContent)==40)
           {      
             alert("YOU COMPLETED IT!");
             gettime();
             bestofall();
             board();
             leader();}
           else
           e.target.textContent=Math.floor(Math.random()*25)+41 ;
        }  
        else return;
      });
    });
  } 
         
    
      