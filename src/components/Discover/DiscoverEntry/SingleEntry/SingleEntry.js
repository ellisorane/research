import React, { useState } from "react";

import Payment from "./Payment/Payment";

import classes from "./SingleEntry.module.scss";
import parent from "../DiscoverEntry.module.scss";
import discover from "../../Discover.module.scss";

import entryImage from '../../../../imgs/fruit research.jpg';

const SingleEntry = () => {
    const [showPayment, setShowPayment] = useState(false);

    return(
        <div className={classes.singleEntryContainer}>

            <div className={classes.projectHead}>

                <h1 className={classes.entryTitle}>Create a fruit/vegetable that could replace meat</h1>
                <div className={classes.researchers}>
                    <p><strong>Researcher(s):</strong></p>
                    <p><u>Giorgio Blastawind</u></p>
                </div>
                <div className={classes.institution}>
                    <p><strong>Institution:</strong></p>
                    <p><u>Giorgio University</u></p>
                </div>

                <div className={classes.hero}>
                    
                    <div className={classes.imgTagContainer}>
                        <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url('${entryImage}')` }} className={classes.heroImage}></div>
                        <div className={classes.tags}>
                            <a href="#" className={classes.tag}>Biology</a>
                            <a href="#" className={classes.tag}>Ecology</a>
                        </div>
                    </div>
                    


                    <div className={classes.fundingBox}>

                        <Payment showPayment={showPayment} setShowPayment={setShowPayment} />

                        <div className={classes.pledged}>
                            <h1>$1,245</h1>
                            <p>Pledged</p>
                        </div>

                        <div className={classes.progressBar}>
                            <div className={classes.progress}></div>
                        </div>

                        <div className={classes.entryFunding}>
                            <div>
                                <h4>45%</h4>
                                <p>Funded</p>
                            </div>
                            <div>
                                <h4>$11,232</h4>
                                <p>Goal</p>
                            </div>
                            <div>
                                <h4 className={classes.fundedRightAlign}>26</h4>
                                <p>Days left</p>
                            </div>
                        </div>

                        <div className={classes.entryFundingMobile}>
                            <div>
                                <h4>$12,000</h4>
                                <p>pledged</p>
                            </div>
                            <div className={classes.borderedFunded}>
                                <h4>45%</h4>
                                <p>funded</p>
                            </div>
                            <div>
                                <h4>26</h4>
                                <p>days left</p>
                            </div>
                        </div>

                        <div className={classes.fundBtn} onClick={ () => setShowPayment(true) }>Back this Project</div>

                    </div>

                </div>
                
            </div>

            <div className={classes.projectInfo}>
                <div>
                    <h2>About this project</h2>
                    <p>Humpback whales were hunted to near extinction until whaling was banned in 1963. Population recovery is slow due to long generation times and human interference. Interestingly, it seems that the near decimation of humpbacks did not lead to a bottleneck effect on their genetic variety. We intend to assemble a haplotype genome (meeting CGP standards) of Cook Islands humpbacks to understand their genetic variation and compare inter-and intra-specific differences.</p>
                </div>
            </div>
                
        </div>
    );
}

export default SingleEntry; 

