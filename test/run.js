<<<<<<< HEAD
const action = process.argv[2];

if (action) 
  import( `./actions/${action}.js` );
=======
import(`./${process.argv[2]}.js`) ;
>>>>>>> ddac2e4f169939cde45c35c5b2d7a9066616beb1
