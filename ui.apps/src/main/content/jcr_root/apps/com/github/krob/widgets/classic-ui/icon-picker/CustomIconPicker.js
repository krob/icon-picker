/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/**
 * @class CQ.Ext.CustomIconPicker
 * @extends CQ.Ext.Component
 * Simple icon picker to pick from a list of icons

/**
 * @constructor
 * Create a new CustomIconPicker
 * @param {Object} config The config object
 * @xtype CustomIconPicker
 */
CQ.Ext.CustomIconPicker = CQ.Ext.extend(CQ.Ext.Component, {
	/**
     * @cfg {String} itemCls
     * The CSS class to apply to the containing element (defaults to 'x-custom-icon-picker')
     */
    itemCls : 'x-custom-icon-picker',
    /**
     * @cfg {String} value
     * The initial icon.
     */
    value : null,
    /**
     * @cfg {String} clickEvent
     * The DOM event that will cause a icon to be selected. This can be any valid event name (dblclick, contextmenu).
     * Defaults to <tt>'click'</tt>.
     */
    clickEvent :'click',
    // private
    ctype : 'CQ.Ext.CustomIconPicker',

    /**
     * @cfg {Boolean} allowReselect If set to true then reselecting a icon that is already selected fires the {@link #select} event
     */
    allowReselect : false,

    /**
     * An array of icon classes.
     * @type Array
     */
    icons : ["glyphicon glyphicon-step-backward",
		"glyphicon glyphicon-fast-backward",
		"glyphicon glyphicon-backward",
		"glyphicon glyphicon-play",
		"glyphicon glyphicon-pause",
		"glyphicon glyphicon-stop",
		"glyphicon glyphicon-forward",
		"glyphicon glyphicon-fast-forward",
		"glyphicon glyphicon-step-forward",
		"glyphicon glyphicon-eject",
		"glyphicon glyphicon-chevron-left",
		"glyphicon glyphicon-chevron-right",
		"glyphicon glyphicon-plus-sign",
		"glyphicon glyphicon-minus-sign",
		"glyphicon glyphicon-remove-sign",
		"glyphicon glyphicon-ok-sign",
		"glyphicon glyphicon-question-sign",
		"glyphicon glyphicon-info-sign"],

    // private
    initComponent : function(){
        CQ.Ext.CustomIconPicker.superclass.initComponent.call(this);
        this.addEvents(
            /**
             * @event select
             * Fires when a icon is selected
             * @param {CustomIconPicker} this
             * @param {String} icon The icon class
             */
            'select'
        );

        if(this.handler){
            this.on('select', this.handler, this.scope, true);
        }
    },
    
    loadIcons : function() {
    	var request = new XMLHttpRequest();
		request.open('GET', '/apps/com/github/krob/widgets/icons.json', false);  // `false` makes the request synchronous
		request.send(null);

		if (request.status === 200) {
		  console.log(request.responseText);
		  icons = request.responseText;
		}
    },

    // private
    onRender : function(container, position){
        this.autoEl = {
            tag: 'div',
            cls: this.itemCls
        };
        CQ.Ext.CustomIconPicker.superclass.onRender.call(this, container, position);
        var t = this.tpl || new CQ.Ext.XTemplate(
            '<tpl for="."><a href="#" class="{.}" hidefocus="on"></a></tpl>'
        );
        t.overwrite(this.el, this.icons);
        this.mon(this.el, this.clickEvent, this.handleClick, this, {delegate: 'a'});
        if(this.clickEvent != 'click'){
        	this.mon(this.el, 'click', CQ.Ext.emptyFn, this, {delegate: 'a', preventDefault: true});
        }
    },

    // private
    afterRender : function(){
        CQ.Ext.CustomIconPicker.superclass.afterRender.call(this);
        if(this.value){
            var s = this.value;
            this.value = null;
            this.select(s, true);
        }
    },

    // private
    handleClick : function(e, t){
        e.preventDefault();
        if(!this.disabled){
            var c = t.className;
            this.select(c);
        }
    },

    /**
     * Selects the specified icon (fires the {@link #select} event)
     * @param {String} icon A icon class
     * @param {Boolean} suppressEvent (optional) True to stop the select event from firing. Defaults to <tt>false</tt>.
     */
    select : function(icon, suppressEvent){
        var el = this.el;

        if(icon != this.value || this.allowReselect){
            if(this.value){
				el.child('a.'+this.value).removeClass('x-custom-icon-picker-sel');
			}
            this.selectIcon(icon);
            this.value = icon;
            if(suppressEvent !== true){
                this.fireEvent('select', this, icon);
                this.setValue(icon);
            }
        }
    },
    selectIcon : function(icon) {
		var el = this.el;

		el.child('a.'+icon).addClass('x-custom-icon-picker-sel');
    },
    setValue : function(icon){
		this.value = icon;
		this.selectIcon(icon);
        return this;
    },
    getRawValue : function(){
        return this.value;
    },
    getValue : function(){
        return this.value;
    }
});
CQ.Ext.reg('customiconpicker', CQ.Ext.CustomIconPicker);
