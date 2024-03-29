<?php
namespace Auxin\Plugin\CoreElements\Elementor\Elements;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Color;
use Elementor\Scheme_Typography;
use Elementor\Utils;
use Elementor\Control_Media;
use Elementor\Group_Control_Border;


if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Elementor 'Map' widget.
 *
 * Elementor widget that displays an 'Map'.
 *
 * @since 1.0.0
 */
class Gmap extends Widget_Base {

    /**
     * Get widget name.
     *
     * Retrieve 'Map' widget name.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name() {
        return 'aux_gmap';
    }

    /**
     * Get widget title.
     *
     * Retrieve 'Map' widget title.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title() {
        return __( 'Map', 'auxin-elements' );
    }

    /**
     * Get widget icon.
     *
     * Retrieve 'Map' widget icon.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon() {
        return 'eicon-google-maps auxin-badge';
    }

    /**
     * Get widget categories.
     *
     * Retrieve 'Map' widget icon.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_categories() {
        return array( 'auxin-core' );
    }

    /**
     * Register 'Map' widget controls.
     *
     * Adds different input fields to allow the user to change and customize the widget settings.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function _register_controls() {

        /*-----------------------------------------------------------------------------------*/
        /*  map_section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'map_section',
            array(
                'label'      => __('Map', 'auxin-elements' ),
            )
        );

        $this->add_control(
            'latitude',
            array(
                'label'        => __('Latitude','auxin-elements' ),
                'description'  => __('Latitude location over the map.', 'auxin-elements' ),
                'type'         => Controls_Manager::TEXT,
                'default'      => '52'
            )
        );

        $this->add_control(
            'longitude',
            array(
                'label'        => __('Longitude','auxin-elements' ),
                'description'  => __('Longitude location over the map.', 'auxin-elements' ),
                'type'         => Controls_Manager::TEXT,
                'default'      => '14'
            )
        );

        $this->add_control(
            'marker_info',
            array(
                'label'        => __('Marker info','auxin-elements' ),
                'description'  => __('Marker popup text, leave it empty if you don\'t need it.', 'auxin-elements' ),
                'type'         => Controls_Manager::TEXT,
            )
        );

        $this->add_control(
            'attach_id',
            array(
                'label'       => __('Marker Icon','auxin-elements' ),
                'description' => __('Pick a small icon for gmaps marker.', 'auxin-elements' ),
                'type'         => Controls_Manager::MEDIA,
            )
        );


        $this->end_controls_section();


        /*-----------------------------------------------------------------------------------*/
        /*  general_section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'general_section',
            array(
                'label'      => __('General', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
            )
        );

        $this->add_control(
            'type',
            array(
                'label'       => __('Map type', 'auxin-elements'),
                'type'        => Controls_Manager::SELECT,
                'default'     => 'ROADMAP',
                'options'     => array(
                    'ROADMAP'  => __('Roadmap', 'auxin-elements' ),
                    'Satelite' => __('Satelite'  , 'auxin-elements' ),
                )
            )
        );

        $this->add_control(
            'height',
            array(
                'label'        => __('Height','auxin-elements' ),
                'type'         => Controls_Manager::TEXT,
                'default'      => '700'
            )
        );

        $this->add_control(
            'style',
            array(
                'label'        => __('Map style','auxin-elements' ),
                'description'  => __('This feild allow you to customize the presentation of the standard Google base maps. You can find many preset styles in ', 'auxin-elements' ) .
                '<a href="https://snazzymaps.com/" target="_blank">' . __('this website.', 'auxin-elements' ) . '</a>' ,
                'type'         => Controls_Manager::TEXTAREA    ,
                'condition'   => array(
                    'type' => array( 'ROADMAP' ),
                )
            )
        );

        $this->add_control(
            'show_mapcontrols',
            array(
                'label'       => __('Navigation control','auxin-elements' ),
                'description' => __('Show navigation control on map.','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'yes'
            )
        );

        $this->add_control(
            'zoom',
            array(
                'label'        => __('Zoom','auxin-elements' ),
                'type'         => Controls_Manager::TEXT,
                'default'      => '4'
            )
        );

        $this->add_control(
            'zoom_wheel',
            array(
                'label'       => __('Zoom with mouse wheel','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => '1',
                'default'      => '0'
            )
        );

        $this->end_controls_section();

        // Auxin hook for registering general controls
        do_action( 'auxin/elementor/register_controls', $this );
    }

    /**
    * Render image box widget output on the frontend.
    *
    * Written in PHP and used to generate the final HTML.
    *
    * @since 1.0.0
    * @access protected
    */
    protected function render() {

        $settings   = $this->get_settings_for_display();


        $args       = array(
            'type'             => $settings['type'],
            'style'            => $settings['style'],
            'height'           => $settings['height'],
            'latitude'         => $settings['latitude'],
            'longitude'        => $settings['longitude'],
            'marker_info'      => $settings['marker_info'],
            'show_mapcontrols' => $settings['show_mapcontrols'],
            'zoom'             => $settings['zoom'],
            'zoom_wheel'       => $settings['zoom_wheel'],
            'attach_id'        => $settings['attach_id']['id'],
        );

        // get the shortcode base blog page
        echo auxin_widget_gmaps_callback( $args );

    }

}
