let colors=require('colors');
//gestion erreur argument
function gestErrArgt(){
    let nomPlateau=process.argv.slice(2);
    if(nomPlateau.length!=1){
        throw `erreur argument: il faut 1 seul nom de fichier`
    }
    else if (nomPlateau.length===1){
        return nomPlateau;
    }
}
let nomPlateau2=gestErrArgt();

//main code
function recupContentFile(namePlateau){
    /*recuperer le contenu du fichier namePlateau2 et le stocker dans une variable*/
    let fs=require('fs'), plateauV;
    plateauV=fs.readFileSync(namePlateau[0],{encoding:'utf-8'}); //console.log(plateauV);
    return plateauV;
}let plateauV=recupContentFile(nomPlateau2); //console.log(plateauV);

function lignEtColonneDans1Index(platV){
    /*mettre chaque ligne du plateauV dans un index de plateauT*/
    let plateauT=[''], index=0,finish;
    for(let i=0; i<=platV.length-1; i++){
        for(let j=index; j<=platV.length-1; j++){
            if(platV[j]==="\n"){
                index=j+1; break;
            }
            else if(platV[j]==="."|| platV[j]==="*"|| platV[j]==='1'|| platV[j]==='2'){
                plateauT[i]+=platV[j];
            }
            if(j===platV.length-1){
                finish=true;
            }
        }
        if(finish===true){break};    
    } //console.log(plateauT);
    
    /*supprimez la premiere ligne et le caractere undefined de plateauT puis mettre chaque colonne dans un index */
    for (let i=0; i<=plateauT.length-1; i++){
        if(i===0){plateauT.shift()};
        plateauT[i]=plateauT[i].split('undefined');
        plateauT[i].shift();
        plateauT[i]=plateauT[i][0].split('');
    } nbrElementD1Ligne=plateauT[0].length; //console.log(plateauT);
    return plateauT;
}let plateauT=lignEtColonneDans1Index(plateauV); //console.log(plateauT);

let predecesseur=recupContentFile(nomPlateau2);
let predecessFinal=lignEtColonneDans1Index(predecesseur);

//rechercher l'entrée(coordonée)
function findEnter(){
    for(let l=0; l<=plateauT.length-1; l++){
        for(let c=0; c<=plateauT.length-1; c++){
            if(plateauT[l][c]==='1'){
                return `${l}:${c}`;
            }
        }  
    }
} let coordEnter=findEnter(); //console.log(`Coordonnée de l'entrée ligne:colonne ${coordEnter}`);
   
//convertir coordEnter en tableau et convetir chaque element en number
coordEnter=coordEnter.split(':');
for(let i=0; i<=coordEnter.length-1; i++){coordEnter[i]=Number(coordEnter[i]);}

//rechercher la sortie(coordonee)
function findExit(){
    for(let l=0; l<=plateauT.length-1; l++){
        for(let c=0; c<=plateauT.length-1; c++){
            if(plateauT[l][c]==='2'){
                return `${l}:${c}`;
            }
        }
    }
} let coordExit=findExit(); //console.log(`Coordonnée de la sortie ligne:colonne ${coordExit}`); 
    
//convertir coordExit en tableau et convertir chaque element en number
coordExit=coordExit.split(':');
for(let i=0; i<=coordExit.length-1; i++){coordExit[i]=Number(coordExit[i]);} 

/*créer un tableau avisiter contenant les coordonee des cases accessibles
acceder à ces coordonnees ou ces cases et verifier les 4 deplacements possibles ou verifier ses voisins
    si deplacement possibles affecter la distance dans ces cases vide et ajouter les coordonnees de cette nouvelle case dans le tablau avisiter afin de verifier aussi les 4 deplacements possibles autour de celle ci
*/
let nbrLigne=plateauT.length-1, nbreColonne=plateauT[0].length-1, debutL=coordEnter[0], debutC=coordEnter[1], sortieL=coordExit[0], sortieC=coordExit[1], aVisiter=[], coupFinal=undefined; //console.log(nbrLigne,nbreColonne,debutL,debutC,sortieL,sortieC);

//inserer les coordonnées de la premiere case vide dans le tableau avisiter. Ces coordonnees correspondent à l'entré du labyrinthe depart
aVisiter.push([debutL,debutC]); aVisiter[0][0]=Number(aVisiter[0][0]); aVisiter[0][1]=Number(aVisiter[0][1]); //console.log(aVisiter);
    
//je demarre à l'entrée
//console.log(`je demarre au coordonée ligne: ${debutL} et colonne: ${debutC}`.green);

//affecter 0 coups dans l'entrée 1 afin daffecter le nombre de coup au case vide suivante
plateauT[debutL][debutC]=0; //console.log(plateauT);

if(debutL===sortieL && debutC===sortieC){
    console.log(`On est sortie du labyrinthe à ${plateauT[debutL][debutC]} coup`);
}
else{
/*verifier les 4 types de deplacements possibles pour chaque cases vides du tableau avisiter et ajouter les nouvelles cases àvisiter et ajouter d'ou l'on vient dans le tableau predecesseur
    si il y a 2 dans le type de deplacement qu'on effectue alors affecter le nombre de coup dans coup final et sortir de la boucle*/
    for(let i=0; i<=aVisiter.length-1; i++){
        function moveNord(l,c){
            if(l<=nbrLigne && l>0){
                if(plateauT[l-1][c]==='.'){
                    //console.log('on vient de: ', l, c);
                    predecessFinal[l-1][c]=[l,c];
                    //console.log('au nord il y a: '+plateauT[l-1][c]);
                    plateauT[l-1][c]=plateauT[l][c]+1; //console.log(`deplacement nord de ${plateauT[l-1][c]} coup`);
                    aVisiter.push([l-1,c]); //console.log(aVisiter)
                }
                if(plateauT[l-1][c]==='2'){
                    //console.log('on vient de: ', l,c);
                    predecessFinal[l-1][c]=[l,c];
                    //console.log('au nord il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[l][c]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
            }
        } moveNord(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    
        function moveSud(lS,cS){
            if(0<=lS && lS<nbrLigne){
                if(plateauT[lS+1][cS]==='.'){//console.log('on vient de: ',lS,cS);
                    predecessFinal[lS+1][cS]=[lS,cS];
                    //console.log('sud: '+plateauT[lS+1][cS]);
                    plateauT[lS+1][cS]=plateauT[lS][cS]+1; //console.log(`deplacement sud de ${plateauT[lS+1][cS]} coup`);
                    aVisiter.push([lS+1,cS]);
                }
                if(plateauT[lS+1][cS]==='2'){
                    //console.log('on vient de: ', lS,cS);
                    predecessFinal[lS+1][cS]=[lS,cS];
                    //console.log('au sud il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[lS][cS]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
            }
        }moveSud(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    
        function moveEst(lE,cE){ 
            if(cE>=0 && cE<nbreColonne){
                if(plateauT[lE][cE+1]==='.'){//console.log('on vient de: ',lE,cE);
                    predecessFinal[lE][cE+1]=[lE,cE];
                    //console.log('est il y a: '+plateauT[lE][cE+1]);
                    plateauT[lE][cE+1]=plateauT[lE][cE]+1; //console.log(`deplacement est de ${plateauT[lE][cE+1]}`);
                    aVisiter.push([lE,cE+1]);
                }
                if(plateauT[lE][cE+1]==='2'){
                    //console.log('on vient de: ', lE,cE);
                    predecessFinal[lE][cE+1]=[lE,cE];
                    //console.log('à est il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[lE][cE]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
            }
        }moveEst(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    
        function moveOuest(lO,cO){
            if(cO>0 && cO<=nbreColonne){
                if(plateauT[lO][cO-1]==='.'){//console.log('on vient de: ',lO,cO);
                    predecessFinal[lO][cO-1]=[lO,cO];
                    //console.log('ouest il y a: '+plateauT[lO][cO-1]);
                    plateauT[lO][cO-1]=plateauT[lO][cO]+1; //console.log(`deplacement ouest de ${plateauT[lO][cO-1]}`);
                    aVisiter.push([lO,cO-1]);
                }
                if(plateauT[lO][cO-1]==='2'){
                    //console.log('on vient de: ', lO,cO);
                    predecessFinal[lO][cO-1]=[lO,cO];
                    //console.log('à ouest il y a: '+plateauT[l-1][c]);
                    coupFinal=plateauT[lO][cO]+1; //console.log(`on est sortie du labyrinthe en ${coupFinal} coups`.yellow);
                }
            }   
        }moveOuest(aVisiter[i][0],aVisiter[i][1]);
        if(coupFinal != undefined){break;}
    }//console.log(plateauT);
    
    function resultat(){
        if(coupFinal===undefined){
            //convertir plateauT en variable
            for(let i=0; i<=plateauT.length-1; i++){
                plateauT[i]=plateauT[i].join('');
            }
            plateauT=plateauT.join('\n'); console.log(plateauT); return `il n'y a pas de sortie possible`.red;
        }
        else{
            //affecter le caractere chemin o dans le tableau predecesseur
            for (let i=0; i>=0; i++){
                if((sortieL===debutL) && (sortieC===debutC)){
                    break;
                }
                else{
                    //console.log('On est à la case', sortieL, sortieC);
                    function parcourPredecesseur(l,c){
                        sortieL=predecessFinal[l][c][0]; 
                        sortieC=predecessFinal[l][c][1];
                        //console.log('je viens de',predecessFinal[l][c]);
                        plateauT[l][c]='o';
                    }parcourPredecesseur(sortieL,sortieC);
                }
            }//console.log(plateauT);

            //parcourir chaque caractere de plateaut pour affecter un carctere . là ou il y a des nombres
            for (let i=0; i<=plateauT.length-1; i++){
                for(let j=0; j<=plateauT[0].length-1; j++){
                    if(i===coordExit[0] && j===coordExit[1]){
                        plateauT[i][j]='2';
                    }
                    else if(i===coordEnter[0] && j===coordEnter[1]){
                        plateauT[i][j]='1';
                    }
                    else if(isNaN(plateauT[i][j])===false){//console.log(plateauT[i][j]); 
                        plateauT[i][j]='.';
                    }
                }
            }//console.log(plateauT);

            function convertToVariable(){
                //convertir plateauT en variable
                for(let i=0; i<=plateauT.length-1; i++){
                    plateauT[i]=plateauT[i].join('');
                }
                plateauT=plateauT.join('\n'); 
                return plateauT;
            }console.log(convertToVariable());
            
            return `On est sortie du labyrinthe en: ${coupFinal} coups`.yellow;
        }
    }console.log(resultat());
}