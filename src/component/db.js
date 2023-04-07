
const endpoint = 'https://';
export default function DbCommand( { _command } ){

}

export function inject(topScore,getTime,f_sname){
    fetch(endpoint + 'inject', { 
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
            f_score: topScore,
            f_time: getTime,
            f_screen_name: f_sname
        }),
    }).then(()=>{
        console.log("success");
    });
}


export async function getHighScore(){
    try{
        const response = await fetch(endpoint + 'highScore');
        const data = await response.json();
        return data;
        // console.log(data[0].f_score);
    } catch(error) {
        console.log(error);
    }
}


export async function getTopTen(){
    try{
        const response  = await fetch(endpoint + 'handpick');     
        const data = await response.json();        
        return data;        
    } catch (error){
        console.log(error);
    }
}

