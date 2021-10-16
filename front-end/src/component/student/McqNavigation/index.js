import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        display: 'flex',
        flexDirection:'column',
        height:'100vh',
        backgroundColor: 'white',
        border:'1px solid black',
        overflowY:'scroll',
      },
      gridItem: {
        marginTop:'10px',
        color:'black',
        height:'7%',
        fontSize: '1.5rem',
        fontWeight:'500',
        textAlign:'center',
        cursor:'pointer',
        paddingTop:'1rem'
      }
}));

function McqNavigation({studentMCQ , goToQuestion , jumbleStatus, index }) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.gridContainer}>
                
                {
                    studentMCQ

                     ? studentMCQ.mcq.map((mcq,idx)=>(

                        <div 
                            className={classes.gridItem}

                            style = {{ 
                                 background: 
                                     jumbleStatus ? 
                                        studentMCQ.mcq[ studentMCQ?.jumbleOrderMcq[idx].jumble ].status ? "lightgreen" : "lightgrey" :
                                        mcq.status ? "lightgreen" : "lightgrey" ,
                                border: index===idx ? "0.2rem solid black" : null 
                            }}

                            onClick={()=>{
                               goToQuestion(idx)
                            }}
                        > 
                           {idx +1}
                        
                        </div>
                    
                     ))
                     : null
                }
            </div>
        </div>
    )
}

export default McqNavigation
