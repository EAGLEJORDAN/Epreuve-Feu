let argt=process.argv.slice(2,4);
//console.log(argt);
let argt2=process.argv[4];
if (argt2!=undefined)
{
    console.log("error");
}
else if (argt2===undefined)
{   //je transforme les élements de argt en type nombre
    for(let i=0; i<=argt.length-1;i++)
    {
        argt[i]=Number(argt[i]);
    }
    //console.log(argt);
    let verticale = "";
    for (let i=0; i<argt[0]; i++)
    {
        if(i===0)
        {
            verticale+="O";
        }
        else if(i===argt[0]-1 && argt[0] != 1)
        {
            verticale+="O";
        }
        else if (i<argt[0])
        {
            verticale+="-";
        }
    }
    console.log(verticale);

    let horizontale = "";
    for (let i=0; i<argt[0]; i++)
    {
        if(i===0 && argt[1]!=1)
        {
            horizontale+="|";
        }
        else if(i===argt[0]-1 && argt[0] != 1)
        {
            horizontale+="|";
        }
        else if (i<argt[0])
        {
            horizontale+=" ";
        }
    }
    for (let i=0; i<argt[1]-2; i++)
    {
        console.log(horizontale);
    }
    if (argt[1]!=1 && argt[1]!= 0 )
    {
        console.log(verticale);
    }
}