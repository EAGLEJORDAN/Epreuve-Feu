/* prendre deux argts: le fichier dans lequel chercher (board.txt) et le fichier qui contient ce qu'on doit chercher (to find.txt)
Si trouvé affiché trouvé et les coordonnées sont:... si pas toruvé affiché introuvable !*/
/* prendre deux argts: le fichier dans lequel chercher (board.txt) et le fichier qui contient ce qu'on doit chercher (to find.txt)
Si trouvé affiché trouvé et les coordonnées sont:... si pas toruvé affiché introuvable !*/

let nomFichier=process.argv.slice(2); const couleur= require('colors');

if (nomFichier[2]!=undefined)
{
    console.log("erreur il faut deux arguments max!".red);
}
else if (nomFichier[0]===undefined||nomFichier[1]===undefined)
{
    console.log("erreur il faut deux arguments".red);

}
else //main code
{   //faire une boucle pour executer ou de recuperer les donnees de chaque fichier de nomFichier et les stocker dans une variable
    const fs= require('fs'); 
    let board, toFind, index="";
    let b=0, d=0, finBoucle, finBoucle2, plateau=[""], plateauInverse="", array2=[""], array2Inverse="", yLigne, xAbscisse,nonPresent, present;
    for (let i=0; i<=nomFichier.length-1;i++)
    {
        if (i===0){board=fs.readFileSync(nomFichier[i],"utf-8");}
        else if (i===1){toFind=fs.readFileSync(nomFichier[i],"utf-8")}
    }

    board=board.split(""); toFind=toFind.split(""); console.log(board); console.log(toFind);

    // créer un tableau à dimension multiple selon le nombre de ligne que contient board
    for (let i=0; i<=board.length-1; i++)
    {
        for ( let a=b; a<=board.length-1; a++)
        {
            if(board[a]==="\n"){
                plateau[i]+=board[a];
                b=a+1; break;
            }
            /*else if(board[a]==="\r"){
                continue;
            }*/
            else{
                if(plateau[i]===undefined){
                    plateau.splice(i,1,board[a]);
                }
                else{
                    plateau[i]+=board[a];
                }
            }
            if(a===board.length-1){
                finBoucle=true;
            }
        }
        if (finBoucle===true){break};
    }//console.log("plateau: ",plateau);
    
    // créer un tableau à dimension multiple selon le nombre de ligne que contient tofind(soit chaque ligne dans un tableau multidimension)
    for (let i=0; i<=toFind.length-1; i++)
    {
        for ( let c=d; c<=toFind.length-1; c++)
        {
            if(toFind[c]==="\n"){
                array2[i]+=toFind[c];
                d=c+1; break;
            }
            /*else if(toFind[c]==="\r"){
                continue;
            }*/
            else if (toFind[c]===" "){
                continue;
            }
            else{
                if(array2[i]===undefined){
                    array2.splice(i,1,toFind[c]);
                }else{
                    array2[i]+=toFind[c];
                }
            }
            if(c===toFind.length-1){
                finBoucle2=true;
            }
        }
        if (finBoucle2===true){break};
    }//console.log("tableau2: ",array2);

    //inverser les elements du plateau soit le dernier element de plateau devient le premier et le premier element de plateau devient le  dernier
    for (let i=plateau.length-1; i>=0; i--)
    {
        if(i===0){
            plateauInverse+=plateau[i];
        }
        else{
            plateauInverse+=plateau[i]+" ";
        }
    }plateauInverse=plateauInverse.split(" "); //console.log("plateau inverse est : ",plateauInverse);
    
    //inverser les elements de array2 soit le dernier element de array2 devient le premier et le premier element de array2 devient le  dernier
    for (let i=array2.length-1; i>=0; i--)
    {
        if(i===0){
            array2Inverse+=array2[i];
        }
        else{
            array2Inverse+=array2[i]+" ";
        }
    }array2Inverse=array2Inverse.split(" "); //console.log("array2 inverse est : ",array2Inverse);

    // rechercher array2Inverse dans plateauInverse en utilisant indexof
    let f=plateauInverse.length-1;
    for (let i=array2Inverse.length-1; i>=0; i--)
    {
        for (let e=f; e>=0; e--)
        {   //si j'ai qu'une sous chaine à trouver
            if(array2Inverse.length===1){
                if(plateauInverse[e].indexOf(array2Inverse[i])!=-1){
                    index+=plateauInverse[e].indexOf(array2Inverse[i]); yLigne=e;
                    /*console.log(`all present deniere schaine ${array2Inverse[i]}`);*/ present=true; break;
                }
                else if(plateauInverse[e].indexOf(array2Inverse[i])===-1 && e===0){
                    //console.log(`absent ${array2Inverse[i]}`);
                    nonPresent=false; 
                }
            }//si le nombre de sous chaine est > 1
            else{
                if(plateauInverse[e].indexOf(array2Inverse[i])!=-1 && i===0){
                    //console.log(`all present derniere schaine ${array2Inverse[i]}`);
                    present=true;
                }
                else if(plateauInverse[e].indexOf(array2Inverse[i])!=-1 && i===array2Inverse.length-1){
                    index+=plateauInverse[e].indexOf(array2Inverse[i]); 
                    yLigne=e; /*console.log(`present ${array2Inverse[i]} abscisse ${index} et ordonnée ${yLigne}`);*/
                    f=e-1; break;
                }
                else if (plateauInverse[e].indexOf(array2Inverse[i])===-1 && e===0){
                    //console.log(`absent ${array2Inverse[i]}`);
                    nonPresent=false; break;
                }
                else if(plateauInverse[e].indexOf(array2Inverse[i])!=-1 && e < plateauInverse.length-1){
                    //console.log(`present ${array2Inverse[i]}`)
                    plateauInverse[e].indexOf(array2Inverse[i]); f=e-1; break;
                }
                else if (plateauInverse[e].indexOf(array2Inverse[i])===-1 && e===0){
                    nonPresent=false; break;
                }
            }
        }
        if (nonPresent===false){
            console.log('Introuvable'); break;
        }
    }
    //si les sous chaines sont trouvé affiché trouvé
    if(present===true){
        console.log(`Trouvé!\nLes coordonnées sont : ${index} ${yLigne}`);        
    }
}