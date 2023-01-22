let argt = process.argv[2];
let argt2= process.argv.slice(3);
if (argt2[0]!=undefined)
{
    console.log("erreur il faut qu'un seul argument!");
}
else if(argt===undefined)
{
    console.log("erreur, il manque un argument");
}
else if (argt2[0]===undefined)
{
    let typeNombre=[];
    let resultat;
    //verifiez si il y a des nombres dans argt
    for (let i=0; i<=argt.length-1; i++)
    {
        if (argt[i]===" ")
        {
            typeNombre[i]=argt[i];
        }
        else if(isNaN(argt[i])===false) //si c'est un nombre
        {
           typeNombre[i]=Number(argt[i]); //convertir en type number et les stocker dans  le tableau typeNumber à la meme position
        }
        else if (isNaN(argt[i]))
        {
            typeNombre[i]=argt[i]; //si ce n'est pas un nombre
        }
    }
    console.log(typeNombre);
    for (let i=0; i<=typeNombre.length-1; i++) // joindre les suites de deux chiffres
    {
        if(isNaN(typeNombre[i-1])===false && typeNombre[i-1] != " " && typeNombre[i]!= " " && typeNombre[i] !=")" && typeNombre[i] !="(" && typeNombre[i]!="+" && typeNombre[i] != "*" && typeNombre[i] != "-" && typeNombre[i] != "/" && typeNombre[i] != "%")
        {
            typeNombre[i-1]+=typeNombre[i].toString(); 
            typeNombre.splice(i,1);
        }
    }
    console.log(typeNombre);
    for (let i=0; i<=typeNombre.length-1; i++) // convertir les chiffres de type string en type nombre
    {
        if(typeof(typeNombre[i])==="string" && isNaN(typeNombre[i])===false && typeNombre[i] != " " )
        {
            typeNombre[i]=Number(typeNombre[i]);
        }
    }
    console.log(typeNombre);
    for (let i=0; i<=typeNombre.length-1; i++) //supprimez les caracteres vides
    {
        if(typeNombre[i]===" ")
        {
            typeNombre.splice(i,1);
        }   
    }
    console.log(typeNombre);
    for (let i=0; i<=typeNombre.length-1; i++) // remplacer les opérandes type string par de vrai operandes
    {  
        resultat=typeNombre[i]; break;
    }
    console.log(resultat);
}
