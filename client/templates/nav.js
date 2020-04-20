 Template.home.onCreated(function() {
        this.autorun(function() {
          console.log("nav currentevent selectedYear=====>", Session.get("currentevent"), Session.get('selectedYear'));
          
          if(this.cupsHandler){
            this.cupsHandler.stop();
          }
          this.cupsHandler = Meteor.subscribe('cups',Session.get("currentevent"), Session.get('selectedYear'))
        });
        this.autorun(function() {
          console.log("nav currentevent=====>", Session.get("currentevent"));
          
          if(this.cupsYearHandler){
            this.cupsYearHandler.stop();
          }
          this.cupsYearHandler = Meteor.subscribe('cupsYear',Session.get("currentevent"))
        });
        
});

Template.nav.helpers({
  // Iron Router stores {initial: true} in history state if this is
  // the first route that we hit in an app. There are a variety of 
  // unexpected ways that this can happen (for example oauth, or 
  // hot code push), but we can't rely on going back in such cases.
  back: function () {
    return this.back && ! history.state.initial;
  },
  cupinfo: function (year) {
    console.log("nav cupinfo year=====>", year);
    return Cups.find({year:parseInt(year),event:Session.get('currentevent')}); 
},
  year: function(){
    return Session.get("selectedYear");
  },
  getcups: function (){
    // var ready = Meteor.subscribe('cups',Session.get("currentevent")).ready();    
    return Cups.find({event:Session.get('currentevent')},{sort:{year:-1}});  
  }   
    
});

Template.nav.events({
    'change .currentyear2': function(){
        var year = currentyear2.value; // could be the P or a child element
        Session.set('selectedYear',parseInt(year));
        // if(this.matchesHandler){
        //   this.matchesHandler.stop();
        // }
        // this.matchesHandler = Meteor.subscribe('matches',{name:'all',year:parseInt(year),event:Session.get('currentevent')})
        
        
    }
})
