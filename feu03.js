const fs =require('fs');

let argt=process.argv[2], argt2=process.argv.slice(3), sudoku, sudoku2=[], pst=0, finish, nbrLig, nbrcol, arrayNombre=[1,2,3,4,5,6,7,8,9], caseVide; //console.log(argt, argt2[0]);
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
} console.log('contenu du sudoku: ',sudoku);

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

} console.log('chaque ligne du sudoku dans un index: ',sudoku2);

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

/*parcourir le tableau sudoku2 dès que je tombe sur un caractere espace vide: mettre dans cette case les nombres candidats( pour cela verifier si le nombre est present dans la rangé dans la colonne et dans la region: si absent l'inserer dans la case et verifier d'autres nombres).*/
for (let ligne=0; ligne<=sudoku2.length-1; ligne++){
    for (let col=0; col<=sudoku2[0].length-1; col++){    
        if(sudoku2[ligne][col]===' '){//verifiez les candidat possible
            console.log(sudoku2[ligne][col],' case est vide'); let colSelec; colSelec=col; console.log(colSelec);
            for(let a=0; a<=arrayNombre.length-1; a++){
                for (let colAnex=0; colAnex<=sudoku2[0].length-1; colAnex++){
                    if(sudoku2[ligne][colAnex]===arrayNombre[a]){
                        console.log(arrayNombre[a],' est present'); break;
                    }
                    if(col===sudoku2[0].length-1){
                        sudoku2[ligne][colSelec]+=arrayNombre[a]; console.log(arrayNombre[a],' est candidat'); break;
                    }
                }
            }
        }
    }
}


                        

/*Une fois tout les candidats inserer dans la case vide passer à une autre case vide jusqu'a remplir toute les cases vides.
Reparcourir le tableau sudoku afin verifier s'il y a des simplets nu(case avec un seul candidat) si oui : inserer se candidat definitivement.
Reparcourir le tableau sudoku afin de verifier s'il y a des simplets cachés(des candidats qui sont presents que dans une seul case de la rangé)*/

