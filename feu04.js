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
function findBiggerCarre(namePlateau){
    /*recuperer le contenu du fichier namePlateau2 et le stocker dans une variable*/
    let fs=require('fs'), colors=require('colors'), plateauV, plateauT=[''], index=0, finish;
    plateauV=fs.readFileSync(namePlateau[0],{encoding:'utf-8'}); //console.log(plateauV);
    
    /*mettre chaque ligne du plateauV dans un index de plateauT*/
    for(let i=0; i<=plateauV.length-1; i++){
        for(let j=index; j<=plateauV.length-1; j++){
            if(plateauV[j]==="\r"){
                index=j+2; break;
            }
            else if(plateauV[j]==="."|| plateauV[j]==="x"){
                plateauT[i]+=plateauV[j];
            }
            if(j===plateauV.length-1){
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
    
    function findeCarre(l,c,dimAnex,indexLastLigneAnx){ 
        let obstacle=false,carre=false, finLigne=l+(dimension-1), finCol=c;
        for(startL=l; startL<=finLigne; startL++){
            if(startL>indexLastLigneAnx){break;}
            for(startC=c-1; startC<=finCol; startC++){
                if(plateauT[startL][startC]==='x'){
                    //console.log(`il y a un: ${plateauT[startL][startC]} à la ligne: ${startL} et à la colonne: ${startC}`.red);
                    obstacle=true; break;
                }
                else if(startL===l+(dimAnex-1) && startC===finCol){
                    //console.log(`il y a un carré à: ${dimAnex} dimension à la ligne: ${l} et à la colonne: ${finCol}`.green);
                    coordonees+=finCol+':'+l+','; selectDimen+=dimAnex+',';
                    carre=true;
                    if(startC===lastColonne){
                        obstacle=true;
                    } 
                }
                else if(plateauT[startL][startC]==='.'){
                    //console.log(`il y a un: ${plateauT[startL][startC]} à la ligne: ${startL} et à la colonne: ${startC}`.yellow);
                }
            }
            if(obstacle===true){obstacle=false; break;}
            else if(carre===true){
                dimAnex+=1; startL=l-1; finLigne+=1; finCol=finCol+1; carre=false; 
                //console.log(`Cherche maintenant un carre à ${dimAnex} dimension. de la ligne: ${startL+1} à la finLigne:${finLigne} et jusqu'à la colonne: ${finCol}`);
            }
        }
    }
    
    /*parcourir plateauT en mode sonic pour trouver un carré à deux dimensions*/
    let avtLastLigne=plateauT.length-2, lastColonne=plateauT[0].length-1, dimension=0, coordonees='', selectDimen='', indexLastLigne=plateauT.length-1, coordoneesFinal, dimensionFinal, carreFinal;
    for(let ligne=0; ligne<=avtLastLigne; ligne++){
        for(let colonne=0; colonne<=lastColonne; colonne++){
            if(plateauT[ligne][colonne]==='.'){
                //console.log(`il y a un: ${plateauT[ligne][colonne]} à la ligne: ${ligne} et à la colonne: ${colonne}`);
                dimension+=1;
                if(dimension>=2){/*sonic cherche un carre à partir de deux dimensions*/
                    findeCarre(ligne,colonne,dimension,indexLastLigne); dimension=0; colonne=colonne-1;
                }
                else if(colonne===lastColonne){dimension=0;}
            }
            else if(plateauT[ligne][colonne]==='x'){dimension=0;}    
        }
    }

    //convertir coordonne et selecDimen en tableau afin de separer coordone et dimension
    coordonees=coordonees.split(','); coordonees.pop(); selectDimen=selectDimen.split(','); //console.log(coordonees , selectDimen);
    
    /*recuperer la plus grande dimension et son index dans le tableau selecDimen si plusieurs solutions prendre la premiere*/
    function findBigerDimension(){
        let selection,index;
        selection=selectDimen[0]; index=0;
        for(let i=0; i<=selectDimen.length-1; i++){ //selectionner un chiffre
            if(selection<selectDimen[i+1]){
                selection=selectDimen[i+1]; index=i+1;
            }
            else if(selection>selectDimen[i+1]){
                continue;
            }
            else if (selection===selectDimen[i+1]){
                continue;
            }
        } 
        return selection+':'+index;
    }
    let dimenEtIndex=findBigerDimension(); //console.log(dimenEtIndex);

    /*recuperer la valeur correspondant à cette index dans le tableau coordonnees*/
    function coordo(){
        let index;
        dimenEtIndex=dimenEtIndex.split(':'); index=dimenEtIndex[1]; //console.log(index);
        coordoneesFinal=coordonees[index]; dimensionFinal=dimenEtIndex[0]; //console.log(dimensionFinal,coordoneesFinal);
    }
    coordo();

    /*dessiner le carre dans plateauT à l'aide des dimension et des coordonnées recuperées.*/
    function drawnCarre(){ let y,x;
        coordoneesFinal=coordoneesFinal.split(':'); x=Number(coordoneesFinal[0]); y=Number(coordoneesFinal[1]); //console.log(x,y,dimensionFinal);
        for(let l=y; l<=y+(dimensionFinal-1); l++){
            for(let c=x; c>x-dimensionFinal; c--){
                if(plateauT[l][c]==='.'){
                    plateauT[l][c]='o';
                }
            }
        }//console.log(plateauT);
        
        //convertir plateauT en variable
        for(let i=0; i<=plateauT.length-1; i++){
            plateauT[i]=plateauT[i].join('');
        }
        plateauT=plateauT.join('\n'); return plateauT;
    }
    carreFinal=drawnCarre(); return carreFinal;
}
console.log(findBiggerCarre(nomPlateau2));