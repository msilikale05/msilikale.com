<?php
namespace Auxin\Plugin\CoreElements\Elementor\Elements;

use Elementor\Plugin;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Color;
use Elementor\Scheme_Typography;
use Elementor\Utils;
use Elementor\Control_Media;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Text_Shadow;


if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Elementor 'Image' widget.
 *
 * Elementor widget that displays an 'Image' with lightbox.
 *
 * @since 1.0.0
 */
class Image extends Widget_Base {

    /**
     * Get widget name.
     *
     * Retrieve 'Image' widget name.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name() {
        return 'aux_image';
    }

    /**
     * Get widget title.
     *
     * Retrieve 'Image' widget title.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title() {
        return __('Advanced Image', 'auxin-elements' );
    }

    /**
     * Get widget icon.
     *
     * Retrieve 'Image' widget icon.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon() {
        return 'eicon-insert-image auxin-badge';
    }

    /**
     * Get widget categories.
     *
     * Retrieve 'Image' widget icon.
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
     * Register 'Image' widget controls.
     *
     * Adds different input fields to allow the user to change and customize the widget settings.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function _register_controls() {

        /*-----------------------------------------------------------------------------------*/
        /*  Content Tab
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'image_section',
            array(
                'label'      => __('Image', 'auxin-elements' ),
            )
        );

        $this->add_control(
            'image',
            array(
                'label'      => __('Image','auxin-elements' ),
                'type'       => Controls_Manager::MEDIA,
                'show_label' => false,
                'default'    => array(
                    'url' => Utils::get_placeholder_image_src()
                )
            )
        );

        $this->add_group_control(
            Group_Control_Image_Size::get_type(),
            array(
                'name'       => 'image', // Usage: `{name}_size` and `{name}_custom_dimension`, in this case `thumbnail_size` and `thumbnail_custom_dimension`.
                'separator'  => 'none',
                'default'    => 'large'
            )
        );

        $this->add_control(
            'link',
            array(
                'label'         => __('Image Link','auxin-elements' ),
                'type'          => Controls_Manager::URL,
                'placeholder'   => 'http://phlox.pro',
                'show_external' => true
            )
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'hover_section',
            array(
                'label'      => __('Hover Image', 'auxin-elements' ),
            )
        );

        $this->add_control(
            'display_hover',
            array(
                'label'        => __('Display Hover Image','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no'
            )
        );

        $this->add_control(
            'hover_image',
            array(
                'label'      => __( 'Image', 'auxin-elements' ),
                'type'       => Controls_Manager::MEDIA,
                'show_label' => false,
                'condition'  => array(
                    'display_hover' => 'yes'
                )
            )
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'ribbon_section',
            array(
                'label'      => __('Ribbon', 'auxin-elements' ),
            )
        );

        $this->add_control(
            'display_ribbon',
            array(
                'label'        => __('Diplay Ribbon','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no'
            )
        );

        $this->add_control(
            'ribbon_text',
            array(
                'label'       => __('Text','auxin-elements' ),
                'type'        => Controls_Manager::TEXT,
                'default'     => 'NEW',
                'condition'   => array(
                    'display_ribbon' => 'yes'
                )
            )
        );

        $this->add_control(
            'ribbon_style',
            array(
                'label'       => __('Ribbon Style', 'auxin-elements'),
                'type'        => Controls_Manager::SELECT,
                'default'     => 'simple',
                'options'     => array(
                    'simple' => __('Simple'  , 'auxin-elements' ) ,
                    'corner' => __('Corner'  , 'auxin-elements' ),
                    'cross'  => __('Cross'  , 'auxin-elements' )
                ),
                'condition'   => array(
                    'display_ribbon' => 'yes'
                )
            )
        );

        $this->add_control(
            'ribbon_position',
            array(
                'label'       => __('Ribbon Position', 'auxin-elements'),
                'type'        => Controls_Manager::SELECT,
                'default'     => 'top-right',
                'options'     => array(
                    'top-left'     => __('Top Left'  , 'auxin-elements' ) ,
                    'top-right'    => __('Top Right'  , 'auxin-elements' ),
                    'bottom-left'  => __('Bottom Left'  , 'auxin-elements' ),
                    'bottom-right' => __('Bottom Right'  , 'auxin-elements' )
                ),
                'condition'   => array(
                    'display_ribbon' => 'yes'
                )
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  Content Tab
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'template_section',
            array(
                'label' => __('Settings', 'auxin-elements' ),
                'tab'   => Controls_Manager::TAB_SETTINGS,
            )
        );

        $this->add_control(
            'lightbox',
            array(
                'label'        => __('Open large image in lightbox','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no'
            )
        );

        $this->add_control(
            'icon',
            array(
                'label'       => __( 'Iconic button', 'auxin-elements'),
                'type'        => Controls_Manager::SELECT,
                'default'     => 'plus',
                'options'     => array(
                    'none' => __('None', 'auxin-elements' ),
                    'plus' => __('Plus', 'auxin-elements' )
                ),
                'condition'   => array(
                    'lightbox' => 'yes'
                )
            )
        );

        $this->add_control(
            'preloadable',
            array(
                'label'        => __('PreLoadable the image','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no'
            )
        );

        $this->add_control(
            'preload_preview',
            array(
                'label'        => __('Lazyload the image','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no'
            )
        );

        $this->add_control(
            'tilt',
            array(
                'label'        => __( 'Tilt Effect','auxin-elements' ),
                'description'  => __( 'Adds tilt effect to the image.', 'auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no'
            )
        );

        $this->add_control(
            'colorized_shadow',
            array(
                'label'        => __( 'Colorized Shadow', 'auxin-elements' ),
                'description'  => __( 'Adds colorized shadow to the image. Note: This feature is not available when image hover is active.', 'auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'return_value' => 'yes',
                'default'      => 'no',
                'condition'   => array(
                    'display_hover!' => 'yes'
                )
            )
        );

        $this->add_responsive_control(
            'align',
            array(
                'label'       => __('Alignment','auxin-elements' ),
                'description' => __('Image alignment in content.', 'auxin-elements' ),
                'type'        => Controls_Manager::CHOOSE,
                'options'     => array(
                    'alignleft' => array(
                        'title' => __( 'Left', 'auxin-elements' ),
                        'icon' => 'fa fa-align-left',
                    ),
                    'alignnone' => array(
                        'title' => __( 'Center', 'auxin-elements' ),
                        'icon' => 'fa fa-align-center',
                    ),
                    'alignright' => array(
                        'title' => __( 'Right', 'auxin-elements' ),
                        'icon' => 'fa fa-align-right',
                    ),
                ),
                'default'     => 'center',
                'toggle'      => true,
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  Style Tab
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'image_style_section',
            array(
                'label'     => __( 'Image', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => array(
                    'image!' => '',
                ),
            )
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            array(
                'name' => 'image_box_shadow',
                'label' => __( 'Box Shadow', 'auxin-elements' ),
                'selector' => '{{WRAPPER}} .aux-media-hint-frame',
            )
        );

        $this->end_controls_section();


        $this->start_controls_section(
            'ribbon_style_section',
            array(
                'label'     => __( 'Ribbon', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => array(
                    'display_ribbon' => 'yes',
                ),
            )
        );

        $this->add_control(
            'ribbon_bg_color',
            array(
                'label' => __( 'Background Color', 'auxin-elements' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .aux-ribbon-wrapper' => 'background-color: {{VALUE}} !important;',
                )
            )
        );

        $this->add_control(
            'ribbon_border_color',
            array(
                'label' => __( 'Border Color', 'auxin-elements' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .aux-ribbon-wrapper::before' => 'border-color: {{VALUE}};',
                ),
                'condition' => array(
                    'ribbon_style' => array('cross'),
                ),
            )
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            array(
                'label'    => __( 'Box Shadow', 'auxin-elements' ),
                'name'     => 'header_box_shadow',
                'selector' => '{{WRAPPER}} .aux-ribbon-wrapper'
            )
        );

        $this->add_control(
            'ribbon_text_color',
            array(
                'label' => __( 'Text Color', 'auxin-elements' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .aux-ribbon-wrapper span' => 'color: {{VALUE}} !important;',
                )
            )
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            array(
                'name'     => 'ribbon_typography',
                'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
                'selector' => '{{WRAPPER}} .aux-ribbon-wrapper span'
            )
        );

        $this->add_group_control(
            Group_Control_Text_Shadow::get_type(),
            array(
                'name' => 'ribbon_text_shadow',
                'label' => __( 'Text Shadow', 'auxin-elements' ),
                'selector' => '{{WRAPPER}} .aux-ribbon-wrapper span',
            )
        );

        $this->end_controls_section();

        // Auxin hook for custom register controls
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

    $settings    = $this->get_settings_for_display();

    $link_target = $settings['link']['is_external'] ? '_blank' : '_self';

    $args        = array(
        'image_html'       => Group_Control_Image_Size::get_attachment_image_html( $settings, 'image' ),

        'attach_id'        => $settings['image']['id'],
        'size'             => $settings['image_size'],
        'width'            => $settings['image_custom_dimension']['width'],
        'height'           => $settings['image_custom_dimension']['height'],
        'link'             => $settings['link']['url'],
        'nofollow'         => $settings['link']['nofollow'],
        'target'           => $link_target,

        'attach_id_hover'  => $settings['hover_image']['id'],

        'display_ribbon'   => $settings['display_ribbon'],
        'ribbon_text'      => $settings['ribbon_text'],
        'ribbon_style'     => $settings['ribbon_style'],
        'ribbon_position'  => $settings['ribbon_position'],

        'lightbox'         => $settings['lightbox'],
        'icon'             => $settings['icon'],
        'preloadable'      => $settings['preloadable'],
        'preload_preview'  => $settings['preload_preview'],
        'tilt'             => $settings['tilt'],
        'colorized_shadow' => $settings['colorized_shadow'],
        'align'            => $settings['align'],
    );

    // pass the args through the corresponding shortcode callback
    echo auxin_widget_image_callback( $args );
  }

}
