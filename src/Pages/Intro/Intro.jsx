import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Intro.css'
import rightArrow from '../../assets/Right Arrow.svg'
import darkText from '../../assets/darkText.svg'
import stockImg from '../../assets/stock3.jpg'
import upstoxLogo from '../../assets/upstoxLogo.svg'
import Rupee from '../../assets/Rupee.svg'
import User from '../../assets/User.svg'
import Security_Shield from '../../assets/Security Shield.svg'
import fast from '../../assets/fast.svg'





const Intro = () => {
    const navigate = useNavigate()
    const handleStartedClick = () => {
        navigate('/home')
    }


    return (
        <div className='intro-parent bg-black h-full w-full text-white'>
            <div className="h-full w-full px-10">
                <div className="w-[50%] h-full flex flex-col justify-center gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="heading text-[50px]">Stay Ahead</div>
                        <div className="sub-heading text-[25px]">Your Real-Time Stock Market Hub</div>
                    </div>
                    <div className="get-started-btn" onClick={handleStartedClick}>Get Started <img src={rightArrow} alt="Get Started" /></div>
                </div>
            </div>
            <div className="dark-banner-container bg-black flex justify-center items-center h-[20rem]">
                <img src={darkText} alt="" />
            </div>
            <div className="historical-container flex bg-black">
                <img src={stockImg} alt="" className='img-historical' />
                <div className="sub-heading text-[30px] w-[50%] flex justify-center items-center">
                    <div className="w-[50%]  text-center">
                        Historical performance metrics on a user-friendly platform
                    </div>
                </div>
            </div>
            <div className="historical-container flex bg-black py-[8rem]">
                <img src={upstoxLogo} alt="" className='h-[450px] w-[50%] ml-[4rem]' />
                <div className="sub-heading text-[30px] w-[50%] flex justify-center mt-[3rem]">
                    <div className="w-[50%]  text-center">
                        Seamlessly access your personalized stock market insights by logging in to your Upstox account
                    </div>
                </div>
            </div>
            <div className="adv-grid bg-black justify-center pb-[10rem] ">
                <div className="sub-heading text-[30px] w-[100%] flex items-center mr-[4rem] gap-8 mt-[3rem]">
                    <img src={fast} alt="" />
                    <div className="w-full">
                        Lightning-fast data retrieval
                    </div>
                </div>
                <div className="sub-heading text-[30px] w-[100%] flex items-center mr-[4rem] gap-8 mt-[3rem]">
                    <img src={Security_Shield} alt="" />
                    <div className="w-full">
                        Secure transactions
                    </div>
                </div>
                <div className="sub-heading text-[30px] w-[100%] flex items-center mr-[4rem] gap-8 mt-[3rem]">
                    <img src={Rupee} alt="" />
                    <div className="w-full">
                        Zero brokerage fees
                    </div>
                </div>
                <div className="sub-heading text-[30px] w-[100%] flex items-center mr-[4rem] gap-8 mt-[3rem]">
                    <img src={User} alt="" />
                    <div className="w-full">
                        User Friendly
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Intro