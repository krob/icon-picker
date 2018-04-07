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
    icons : [
		'icon-facebook2',
		'icon-google-plus2',
		'icon-twitter',
		'icon-linkedin',
		'icon-youtube',
		'icon-instagram',
		'icon-reading',
		'icon-office',
		'icon-library2',
		'icon-user-tie',
		'icon-map5',
		'icon-star',
		'icon-location',
		'icon-stats-bars2',
		'icon-brain',
		'icon-clipboard2',
		'icon-square-left',
		'icon-square-right',
		'icon-menu7',
		'icon-stats-dots',
		'icon-box',
		'icon-calendar4',
		'icon-cube4',
		'icon-checkmark',
		'icon-smile',
		'icon-camera',
		'icon-binoculars',
		'icon-share3',
		'icon-paperplane',
		'icon-envelop3',
		'icon-history',
		'icon-clock',
		'icon-briefcase',
		'icon-bubbles',
		'icon-bubble8',
		'icon-hammer-wrench',
		'icon-clipboard5',
		'icon-lock4',
		'icon-user',
		'icon-city',
		'icon-spinner8',
		'icon-users4"',
		'icon-home2',
		'icon-phone2',
		'icon-newspaper',
		'icon-file-pdf',
		'icon-file-word',
		'icon-file-presentation',
		'icon-file-excel',
		'icon-file-spreadsheet',
		'icon-file-zip',
		'icon-file-text2',
		'icon-info2',
		'icon-warning2',
		'icon-checkmark-circle',
		'icon-bell2',
		'icon-star-full2',
		'icon-list2',
		'icon-grid6',
		'icon-tree7',
		'icon-plus-circle2',
		'icon-minus-circle2',
		'icon-cancel-circle2',
		'icon-bin',
		'icon-floppy-disk',
		'icon-pencil7',
		'icon-pencil',
		'icon-circle-down3',
		'icon-circle-up3',
		'icon-cloud-upload2',
		'icon-cloud-download2',
		'icon-files-empty',
		'icon-copy3',
		'icon-paste3',
		'icon-undo',
		'icon-redo',
		'list icon-loop3',
		'icon-arrow-down5',
		'icon-arrow-up5',
		'list icon-arrow-left5',
		'icon-arrow-right5',
		'icon-square-down',
		'icon-square-up',
		'icon-new-tab',
		'icon-search3',
		'icon-enter',
		'icon-exit',
		'icon-user-plus',
		'icon-user-minus',
		'icon-enlarge2',
		'icon-calculator',
		'icon-printer2',
		'icon-arrow-right8',
		'list icon-arrow-left8',
		'icon-arrow-up8',
		'icon-arrow-down8',
		'icon-compass6',
		'icon-vcard',
		'icon-power-cord2',
		'icon-book3',
		'icon-lamp8',
		'icon-medal',
		'icon-road',
		'icon-svg',
		'icon-align-center-horizontal',
		'icon-eye'
    ],


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
