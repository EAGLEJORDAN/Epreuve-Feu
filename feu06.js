function gestErrArgt(){
    let argt=process.argv.slice(2);
    if(argt.length!=0){
        throw 'erreur argument: il faut aucun argument';
    }
    else{
        return argt;
    }
}let argt=gestErrArgt();

function message(messag){
    if(messag.length===0){
        console.log(`Epreuve du feu terminée! C'était dure mais heureusement qu'il y avait 
        les 3 épreuves précédentes pour ne pas vassiller. En tout cas sur le dernier exercice du feu
        je me suis rendu compte à quel point maitriser les structures de contrôles étaient importantes "fonction".
        Je n'avais jamais coder avant de commencer la formation d'Harry et ce jour j'ai créer plusieurs petit programme!
        Merci à tous!`);
    }
}message(argt);