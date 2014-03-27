App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  //this.resource("channels", { path: "/channels" }, function(){
  	this.route("search")
  //});
});


App.SearchRoute = Ember.Route.extend({
  model: function() {
  	//return ['red', 'yellow', 'blue'];
    //jQuery.get('http://thapics:3000/v1/channels/search?q=xoom.com')
	//this().contollerFor('search').set('newContent',this.store.find('service'))
	//this().contollerFor('search').set('newContent',this.store.find('service'))
    return jQuery.get('http://thapics:3000/v1/channels/search?q=xoom.com')
//-----------
	var search,fillStore;

	search= jQuery.get('http://thapics:3000/v1/channels/search?q=xoom.com')

	fillContent = {	  
	  cf: this.controllerFor('accounts.account'),
	  fill: function(payload) {
	    var data;
	    data = {
	      accounts: payload
	    };
	    return this.cf.set('accountDetails', payload);
	  }
	};

	account.then(function() {
	  return fillContent.fill(account.responseJSON);
	});




//-----------

  }
});


App.SearchController = Ember.Controller.extend({
	searchText: null,

  searchResults: function() {
    var searchText = this.get('searchText');
    if (!searchText) { return; }
    console.log (this.get("content.channels"))
    var regex = new RegExp(searchText, 'i');
    return this.get("content.channels").filter(function(title) {
    	//console.log(title):
      return title.match(regex);
    });
  }.property('content.channels.@each','searchText')

});

App.SearchView = Ember.View.extend({
	
});


App.Search = DS.Model.extend({
  title: DS.attr('string'),
  description:  DS.attr('string')
});


DS.ActiveModelAdapter.reopen({
  host: 'http://thapics:3000/v1',
  corsWithCredentials: true
});

App.ApplicationStore = DS.Store.extend({
	adapter:'-active-model'
})



App.Select2 = Ember.Select.extend({
    	defaultTemplate: Ember.Handlebars.compile('<option>{{#if prompt}}{{unbound prompt}}{{/if}}</option>{{#each view.content}}{{view Ember.SelectOption contentBinding="this"}}{{/each}}'),
    	attributeBindings: ['required'],
    	required: false,
    	width: 'resolve',
    	allowClear: true,
		closeOnSelect: true,
 
    	// initialize Select2 once view is inserted in DOM
	didInsertElement : function() {
		//this._super();
		var placeholderText = this.get('prompt') || '';
			console.log(this.$().select2)
        	if (!this.$().select2)
        		console.log  ('select2 is required for Vilio.Select2 control');
        		//throw new Exception('select2 is required for Vilio.Select2 control');
		this.$().select2({
			containerCssClass: 'select2-portfolio',
			placeholder: placeholderText,
			allowClear: this.get('allowClear'),
            		closeOnSelect: this.get('closeOnSelect'),
            		width: this.get('width')
		});
	},
 
    	willDestroyElement : function() {
      		console.log('destroying select2');
        	this.$().select2('destroy');
    	},
 
	// when data is loaded, update select2 to show
	// this data
	itemsLoaded : function() {
		console.log('select2 items loaded');
		Ember.run.sync();
		// trigger change event on selectbox once data
		// has been loaded to update options values
		Ember.run.next(this, function() {
			console.log('updating select2 options list');
			// trigger change event on select2
			if (this.$())
              			this.$().change();
		});
	}.observes('controller.content.isLoaded'),
 
	setSelectedValue: function(value) {
		console.log('setting select2 selected value to ' + value);
		this.$().select2('val', value);		
	},
 
	// observe controller selected content and update select2
	// selected item if selected item is changed on the 
	// controller and does not match currently selected value;
	// this occurs when the selected value is changed outside of
	// the control; must wait until next ember run since 
	// it seems that after create, a new item is not yet available
	// in the list to be selected
	setSelected : function() {
		var path = this.get('optionValuePath');
		var s = path.split('.');
		var fieldname = s[s.length-1];
		var fieldvalue = '';
		var selected = this.get('controller.selected');
		var sel2Val = this.$().select2('val');
		if (selected) fieldvalue = selected.get(fieldname);
		if (sel2Val !== fieldvalue || fieldvalue == '') {
			Ember.run.sync();
			// trigger change event on selectbox once data
			// has been loaded to update options values
			Ember.run.next(this, function() {
				this.setSelectedValue(fieldvalue);
			});
		}
	}.observes('controller.selected')
});



App.ContainterSelect2 = App.Select2.extend({
	
//	// bind change in selected portfolio to trigger routing 
//	// to show portfolio or portfolio list if null
    valueDidChange: Ember.observer(function() {
        this._super();
        var selection = this.get('selection');
        if (selection) {
            console.log('select2 value changed to ' + selection.get('name'));
        	this.get('controller').transitionToRoute('container.show', selection);
        } else {
        	this.get('controller').transitionToRoute('container.index');
        }
    }, 'value')
});