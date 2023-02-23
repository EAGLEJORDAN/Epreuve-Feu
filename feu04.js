/*recuperer le contenu de plateau.txt et le stocker dans une variable*/
let fs=require('fs'), colors=require('colors'), argt=process.argv[2], plateauV, plateauT=[''], index=0, indexObst, finish, nbrePoint=0, nbrElementD1Ligne, finBoucle; //console.log(argt);
plateauV=fs.readFileSync(argt,{encoding:'utf-8'}); console.log(plateauV);

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
}

/*supprimez la premiere ligne et le caractere undefined de plateauT puis mettre chaque colonne dans un index */
for (let i=0; i<=plateauT.length-1; i++){
    if(i===0){plateauT.shift()};
    plateauT[i]=plateauT[i].split('undefined');
    plateauT[i].shift();
    plateauT[i]=plateauT[i][0].split('');
} nbrElementD1Ligne=plateauT[0].length; //console.log(plateauT);

/*parcourir les lignes et les colonnes du tableau et compter le nombre de caractere . consecutif jusqu'au prochain obstacle, mettre le nombre de carcatere dans une variable*/
finBoucle=plateauT[0].length; //console.log(finBoucle);
for(let l=0; l<=plateauT.length-1; l++){
    for (let c=0; c<finBoucle; c++){
        if(l===plateauT.length-1){
            break;
        }
        else if(plateauT[l][c]==="."){
            nbrePoint+=1;
            if(c===finBoucle-1){
                if(nbrePoint>=2){
                    console.log(`nbre point avant prochaine ligne: ${nbrePoint}, à la ligne: ${l} et à la colonne: ${c}`);
                    let debutL=l, debutC=c, carre, condFin, fin=debutL+(nbrePoint-1);//ligne
                    condFin=debutC-nbrePoint+1; console.log(condFin);
                    for(let i=debutL; i<=fin; i++){
                        for(let j=debutC; condFin<=j && j<=c; j--){
                            if(plateauT[i][j]==="."){
                                console.log(`il y a un point à la ligne: ${i} et à la colonne: ${j}`.green);
                                if(i===fin && j===condFin){console.log(`il y a un carre à la ligne: ${l} et à la colonne ${condFin}`.yellow); nbrePoint=0;}
                            }
                            else{
                                console.log(`pas de point à la ligne: ${i} et à la colonne: ${j}`.red); carre=false; break;
                            }
                        }
                        if(carre===false){break;}
                    }
                    nbrePoint=0;
                }
                else if (nbrePoint<2){nbrePoint=0;}
            }
        }
        else if(plateauT[l][c]==="x"){
            /*si le nombre de caractere . est superieure à 2 alors verifier qu'il y a le meme nombre de caractere . consecutif sur les lignes suivantes en fonction du nombre de caractere . - 1*/
            if(nbrePoint>=2){
                console.log(`nbre point avant obstacle: ${nbrePoint}, à la ligne: ${l} et à la colonne: ${c}`);
                if(l===0){
                    let debutL=l, debutC=c-1, carre, condFin;
                    condFin=debutC-nbrePoint+1; console.log(condFin);//ligne
                    for(let i=debutL; i<=nbrePoint-1; i++){
                        for(let j=debutC; condFin<=j && j<c; j--){ //blocage condition
                            if(plateauT[i][j]==="."){
                                console.log(`il y a un point à la ligne: ${i} et à la colonne: ${j}`.green);
                                if(i===nbrePoint && j===condFin){console.log(`il y a un carre à la ligne: ${l} et à la colonne ${condFin}`.yellow); nbrePoint=0;}
                            }
                            else{
                                console.log(`pas de point à la ligne: ${i} et à la colonne: ${j}`.red); carre=false; break;
                            }
                        }
                        if(carre===false){break;}
                    }
                    nbrePoint=0;
                }
                else if(l>0){
                    let debutL=l, debutC=c-1, carre, condFin, fin; fin=debutL+(nbrePoint-1);
                    condFin=debutC-nbrePoint+1; console.log(condFin);//ligne
                    for(let i=debutL; i<=fin; i++){ //fin=debutL+(nbrePoint-1)
                        for(let j=debutC; condFin<=j && j<c; j--){ //blocage condition
                            if(plateauT[i][j]==="."){
                                console.log(`il y a un point à la ligne: ${i} et à la colonne: ${j}`.green);
                                if(i===fin && j===condFin){console.log(`il y a un carre à la ligne: ${l} et à la colonne ${condFin}`.yellow); nbrePoint=0;}
                            }
                            else{
                                console.log(`pas de point à la ligne: ${i} et à la colonne: ${j}`.red); carre=false; break;
                            }
                        }
                        if(carre===false){break;}
                    }
                    nbrePoint=0;
                }
            }
            else if(nbrePoint<2){
                nbrePoint=0; continue;
            }
        }
    }
}
/*si oui:alors remplacer les . par des o et stocker les dimensions(nbre de point),les coordinées x,y du carré et continuer de rechercher des carrés
si non: alors continuer de parcourir les lignes et colonnes du tableau jusqu'au prochain obstacle
*/
