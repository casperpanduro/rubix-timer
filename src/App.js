import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
  const [minutes, setMinutes] = useState(0);
    const [miliSeconds, setMiliSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);

    const isActive = useRef(false);
    const [isFinished, setIsFinished] = useState(false);
    const timerRef = useRef(null);

  useEffect(() => {
    // check for spacebar
    window.addEventListener('keyup', handleChange);
    return () => {
        window.removeEventListener('keyup', handleChange);
    }
  });

  const resetTimer = () => {
        setMinutes(0);
        setSeconds(0);
        setMiliSeconds(0);
        setIsFinished(false);

  }

  const startTimer = () => {
      resetTimer();
    const interval = setInterval(() => {
        setMiliSeconds(miliSeconds => miliSeconds + 1);
        if (seconds === 59) {
            setMinutes(minutes => minutes + 1);
            setSeconds(0);
        }

    }, 10);
      timerRef.current = interval;
  }

  const stopTimer = () => {
      clearInterval(timerRef.current);
  }

    useEffect(() => {
        if (miliSeconds > 99) {
            console.log('seconds', miliSeconds);
            setSeconds(seconds => seconds + 1);
            setMiliSeconds(0);
        }
    }, [miliSeconds]);

    useEffect(() => {
        if (seconds > 59) {
            setMinutes(minutes => minutes + 1);
            setSeconds(0);
        }
    }, [seconds]);


    useEffect(() => {
        if(isFinished) {
            console.log('stop timer');
            stopTimer();
        }
    }, [isFinished]);



  const milisecondsWithLeadingZero = miliSeconds < 10 ? `0${miliSeconds}` : miliSeconds;
  const secondsWithLeadingZero = seconds < 10 ? `0${seconds}` : seconds;
  const minutesWithLeadingZero = minutes < 10 ? `0${minutes}` : minutes;


  const handleChange = (e) => {
    if(e.keyCode === 32 && !isActive.current && !isFinished) {
      console.log('Enter key pressed');
      startTimer();
      isActive.current = true;
    } else if (e.keyCode === 32 && isActive.current) {
        isActive.current = false;
        setIsFinished(true);
    }
  }

  return (
    <div onKeyUp={handleChange} className={'flex text-white justify-center items-center min-h-screen bg-center w-full bg-cover bg-no-repeat'} style={{
      backgroundImage: 'url("./rubix-bg.jpg")',
    }}>
        <Logo />
        <div className={'fixed flex justify-center divide-white divide-x bottom-0 py-4 text-md sm:text-xl left-4 right-4 -mx-6 text-green'}>
            <span className={'px-6'}><span className={'text-white'}>Bedste tid:</span> 0:53 / Casper </span>
            <span className={'px-6'}><span className={'text-white'}>GNS:</span> 1:33</span>
            <span className={'px-6'}><span className={'text-white'}>Sidste tid:</span> 1:55 / Casper</span>
        </div>
        <div className={'text-center'}>
            {!isActive.current && !isFinished && <h1 className={"text-xl md:text-3xl relative"}>Klik på <div className={'inline-block y-1.5 text-green animate-bounce relative'}>space</div> for at begynde</h1>}
            {isFinished && <h1 className={'text-xl md:text-3xl mb-2 font-bold'}>Godt gået!</h1>}
            {(isActive.current || isFinished) && <h1 className={'text-5xl sm:text-6xl md:text-9xl font-bold text-blue-50'}>{minutesWithLeadingZero}:{secondsWithLeadingZero}:{milisecondsWithLeadingZero}</h1>}
            <div className={'flex items-center justify-center space-x-4'}>
                {/*{isFinished && <button onClick={resetTimer} className={"bg-green text-blue-700 rounded-full px-6 py-2 mt-4 inline-block text-xl sm:text-2xl pb-1.5"}>Gem resultat</button>}*/}
                {isFinished && <button onClick={resetTimer} className={"bg-white text-blue-700 rounded-full px-6 py-2 mt-4 inline-block text-xl sm:text-2xl pb-1.5"}>Start forfra</button>}
            </div>
        </div>
    </div>
  );
}

const Logo = () => {
return (
    <div className={'fixed z-50 flex flex-wrap w-16 items-stretch top-0 left-0'}>
        {Array.from({length: 9}).map((_, i) => {
            const colors = ['bg-green', 'bg-amber-300', 'bg-pink-500', 'bg-blue-50', 'bg-white'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
                <div key={i} className={'w-5 h-5 p-0.5'}>
                    <div className={'relative h-full w-full h-full ' + randomColor} />
                </div>
            )
        })}
    </div>
)
}

export default App;
