function person(){
    this.fullName = "Ghayth";
    this.fav = "coca";

    this.descrip = function(){
        console.log('this is :', this );
        console.log(this.fullName + " like " + this.fav);
    };
}

var Ghayth = new person();
Ghayth.descrip();

var descrip = Ghayth.descrip;
descrip();
descrip.call(Ghayth);