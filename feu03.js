const fs =require('fs');

let argt=process.argv[2], argt2=process.argv.slice(3), sudoku, sudoku2=[], pst=0, finish, nbrLig, nbrcol, arrayNombre=[], arrayNombreSelec, caseVide, sudoku2Final=""; //console.log(argt, argt2[0]);
//gestion erreur argument
function erreurArgt(argt,argt2){
    if(argt===undefined || argt2[0]!=undefined){
        console.log("erreur il faut qu'un seul argument!");
    }
}
erreurArgt(argt,argt2);

//main code: trouvez et affichez la solution du sudoku
/*je recupere les donnes du fichier sudoku et les stocker dans une variable de mon main fold.*/
sudoku=fs.readFileSync(argt,{encoding:'utf-8'});

/*convertir la variable en tableau en separant chaque caractere.*/
sudoku=sudoku.split(''); //console.log('contenu du sudoku: ',sudoku);

/*remplacer chaque point dans sudoku par un espace vide afin d'uniformiser*/
for (let i=0; i<=sudoku.length-1;i++){
    if(sudoku[i]==='.'){
        sudoku[i]=' ';
    }
} //console.log('contenu du sudoku: ',sudoku);

/*parcourir mon tableau afin de stocker chaque ligne de caractere dans un index d'un tableau et dès que je tombe sur un \n je stocke la nouvelle ligne de caractere dans un autre index du tableau*/
for (let a=0; a<=sudoku.length-1; a++){
    for (let b=pst; b<=sudoku.length-1; b++){
        if (sudoku[b]==="\n"){
            pst=b+1; break;
        }
        else if(sudoku[b]==="\r"){
            continue;
        }
        else{
            if  (sudoku2[a]===undefined){

                sudoku2[a]=sudoku[b];
            }
            else{
                sudoku2[a]+=sudoku[b];
            }
        }
        if(b===sudoku.length-1){
            finish=true; break;
        }
    }
    if (finish===true){
        break;
    }

} //console.log('chaque ligne du sudoku dans un index: ',sudoku2);

/*compter le nombre de ligne (en comptant le nombre d'element de mon tableau) et de colonne (en comptant le nombre de caractere dans un element de mon tableau) de mon sudoku et les stocker dans une variable*/
nbrLig=sudoku2.length; nbrcol=sudoku2[0].length; //console.log(nbrLig,nbrcol);

/*creer un tableau chiffre qui contient l'échelle du sudoku (de tel nombre à tel nombre ex tableau de: 1 à 9)*/
for(let i=0; i<=nbrcol-1; i++){
    arrayNombre[i]=i+1;
} //console.log(arrayNombre);

/*convertir en tableau chaque element de sudoku2 et affecter le retour dans sudoku2 à l'index en cours */
for (let i=0; i<=sudoku2.length-1; i++){
    sudoku2[i]=sudoku2[i].split('');
} //console.log('chaque nombre du sudoku dans un index: ',sudoku2);

/*convertir les nombres type string en type number*/
for (let ligne=0; ligne<=sudoku2.length-1; ligne++){
    for (let col=0; col<=sudoku2[0].length-1; col++){
        if(sudoku2[ligne][col]===' '){
            continue;
        }
        else if(sudoku2[ligne][col]!=' '){
            sudoku2[ligne][col]=Number(sudoku2[ligne][col]);
        }
    }
} //console.log(sudoku2);

/*parcourir le tableau sudoku2 dès que je tombe sur un caractere espace vide: mettre dans cette case les nombres candidats( pour cela verifier si le nombre est present dans la rangé dans la colonne et dans la region: si absent l'inserer dans la case et verifier d'autres nombres).*/
for (let ligne=0; ligne<=sudoku2.length-1; ligne++){
    for (let col=0; col<=sudoku2[0].length-1; col++){    
        if(sudoku2[ligne][col]===' '){//verifiez les candidat possible
            //console.log(sudoku2[ligne][col],' case est vide à la ligne', ligne,'et à l index', col); 
            let colSelec; colSelec=col;
            for(let index=0; index<=arrayNombre.length-1; index++){//verifiez la contrainte ligne
                for (let colAnex=0; colAnex<=sudoku2[0].length-1; colAnex++){
                    if(arrayNombre[index]===sudoku2[ligne][colAnex]){
                        //console.log(arrayNombre[index],' est present à l index', colAnex); 
                        break;
                    }
                    if(colAnex===sudoku2[0].length-1){//verifiez la deuxieme contrainte colonne
                        for(let ligneAnex=0; ligneAnex<=sudoku2.length-1; ligneAnex++){
                            if(sudoku2[ligneAnex][colSelec]===arrayNombre[index]){
                                //console.log(arrayNombre[index],'est present dans la deuxieme contrainte colonne'); 
                                break;
                            }
                            if(ligneAnex===sudoku2.length-1){//verifiez la troisieme contrainte region
                                arrayNombreSelec=arrayNombre[index];
                                switch(ligneAnex===sudoku2.length-1){
                                    case colSelec<=2 && ligne<=2: //region a
                                        let present0;
                                        for (let a=0; a<=2; a++)
                                        {
                                            for(let b=0; b<=2; b++){
                                                if(arrayNombreSelec===sudoku2[a][b]){
                                                   //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region');
                                                   present0=true; break;
                                                }
                                                if(a===2 && b===2){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                            if(present0===true){break};
                                        }break;
                                    
                                    case colSelec<=5 && colSelec>2 && ligne<=2: //region b
                                        let present1;
                                        for (let c=0; c<=2; c++)
                                        {
                                            for(let d=3; d<=5; d++){
                                                if(arrayNombreSelec===sudoku2[c][d]){
                                                    //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region',colSelec,c,d);
                                                    present1=true; break;
                                                }
                                                if(c===2 && d===5){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                            if(present1===true){break};
                                        }break;

                                    case colSelec>5 && colSelec<=8 && ligne<=2: //region c
                                        let present2;
                                        for (let e=0; e<=2; e++)
                                        {
                                            for(let f=6; f<=8; f++){
                                                if(arrayNombreSelec===sudoku2[e][f]){
                                                    //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region', colSelec, e,f);
                                                    present2=true; break;
                                                }
                                                if(e===2&&f===8){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                            if(present2===true){break};
                                        }break;
                                    
                                    case colSelec<=2 && 2<ligne && ligne<=5://region d
                                        let present3;
                                        for (let g=3; g<=5; g++)
                                        {
                                            for(let h=0; h<=2; h++){
                                                if(arrayNombreSelec===sudoku2[g][h]){
                                                    //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region',g,h);
                                                    present3=true; break;
                                                }
                                                if(g===5 && h===2){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                            if(present3===true){break};
                                        }break;
                                    
                                    case 2<colSelec && colSelec<=5 && 2<ligne && ligne<=5://region e
                                        let present4;
                                        for (let ii=3; ii<=5; ii++)
                                        {
                                            for(let j=3; j<=5; j++){
                                                if(arrayNombreSelec===sudoku2[ii][j]){
                                                    //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region',ii,j); 
                                                    present4=true; break;
                                                }
                                                if(ii===5 && j===5){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                            if(present4===true){break};
                                        }break;
                                    
                                    case 5<colSelec && colSelec<=8 && 2<ligne && ligne<=5://region f
                                        let present5;
                                        for (let k=3; k<=5; k++)
                                        {
                                            for(let l=6; l<=8; l++){
                                                if(arrayNombreSelec===sudoku2[k][l]){
                                                    //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region',colSelec,k,l,'region f'); 
                                                    present5=true; break;
                                                }
                                                if(k===5 && l===8){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                            if(present5===true){break};
                                        }break;
                                    
                                    case 5<ligne && ligne<=8 && colSelec<=2://region g
                                        let present6;
                                        for (let m=6; m<=8; m++)
                                        {
                                            for(let n=0; n<=2; n++){
                                                if(arrayNombreSelec===sudoku2[m][n]){
                                                    console.log(arrayNombreSelec,'est present dans la troisieme contrainte region',m,n,'region g'); 
                                                    present6=true; break;
                                                }
                                                if(m===8 && n===2){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                        if(present6===true){break};
                                        }break;
                                    
                                    case 5<ligne && ligne<=8 && 2<colSelec && colSelec<=5://region h
                                        let present7;
                                        for (let o=6; o<=8; o++)
                                        {
                                            for(let p=3; p<=5; p++){
                                                if(arrayNombreSelec===sudoku2[o][p]){ 
                                                    console.log(arrayNombreSelec,'est present dans la troisieme contrainte region'); 
                                                    present7=true; break;
                                                }
                                                if(o===8 && p===5){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                        if(present7===true){break};
                                        }break;
                                    
                                    case 5<ligne && ligne<=8 && 5<=colSelec && colSelec<=8://region i
                                        let present8;
                                        for (let q=6; q<=8; q++)
                                        {
                                            for(let r=6; r<=8; r++){
                                                if(arrayNombreSelec===sudoku2[q][r]){ 
                                                    //console.log(arrayNombreSelec,'est present dans la troisieme contrainte region'); 
                                                    present8=true; break;
                                                }
                                                if(q===8 && r===8){
                                                    sudoku2[ligne][colSelec]+=arrayNombreSelec.toString(); //console.log(arrayNombreSelec,' est candidat'); 
                                                    break;
                                                }
                                            }
                                        if(present8===true){break};
                                        }break;
                                }
                            }
                        }
                    }
                }
            }
        }
        else if(sudoku2[ligne][col]!=' '){// continue à parcourir les colonnes
            continue;
        }
    }
}//console.log(sudoku2);

/*trouvez s'il y a des simplet nu dans les candidat si oui supprimer les espaces blancs des string et les convertir en type number et affecter au meme endroit*/
for(let i=0; i<=sudoku2.length-1; i++){
    for (let j=0; j<=sudoku2[0].length-1; j++){
        if(typeof sudoku2[i][j]==="string" ){
            sudoku2[i][j]=sudoku2[i][j].trim();
            if(sudoku2[i][j].length===1){
                sudoku2[i][j]=Number(sudoku2[i][j]);
            }
        }
    }
}//console.log(sudoku2);

/* accedez à chaque ligne de sudoku2 et les joindre en string rajouter un retour à la ligne et l'affecter dans la variable finale*/
for (let i=0; i<=sudoku2.length-1; i++){
    if (i===sudoku2.length-1){
        sudoku2Final+=sudoku2[i].join('');
    }
    else{
        sudoku2Final+=sudoku2[i].join('')+"\n";
    }
}console.log(sudoku2Final);

/*Une fois tout les candidats inserer dans la case vide passer à une autre case vide jusqu'a remplir toute les cases vides.
Reparcourir le tableau sudoku afin verifier s'il y a des simplets nu(case avec un seul candidat) si oui : inserer se candidat definitivement.
Reparcourir le tableau sudoku afin de verifier s'il y a des simplets cachés(des candidats qui sont presents que dans une seul case de la rangé)*/

