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


if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

/**
 * Elementor 'Testimonial' widget.
 *
 * Elementor widget that displays an 'Testimonial' with lightbox.
 *
 * @since 1.0.0
 */
class Testimonial extends Widget_Base {

    /**
     * Get widget name.
     *
     * Retrieve 'Testimonial' widget name.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name() {
        return 'aux_testimonial';
    }

    /**
     * Get widget title.
     *
     * Retrieve 'Testimonial' widget title.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title() {
        return __('Testimonial', 'auxin-elements' );
    }

    /**
     * Get widget icon.
     *
     * Retrieve 'Testimonial' widget icon.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon() {
        return 'eicon-testimonial auxin-badge';
    }

    /**
     * Get widget categories.
     *
     * Retrieve 'Testimonial' widget icon.
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
     * Register 'Testimonial' widget controls.
     *
     * Adds different input fields to allow the user to change and customize the widget settings.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function _register_controls() {

        /*-----------------------------------------------------------------------------------*/
        /*  audio_section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'template_section',
            array(
                'label'      => __('Image', 'auxin-elements' ),
            )
        );

        $this->add_control(
            'template',
            array(
                'label'       => __('Templates','auxin-elements' ),
                'label_block' => true,
                'type'        => Controls_Manager::SELECT, //'aux-visual-select',
                'style_items' => 'max-width:31%;',
                'options'     => array(
                    'def-img'   => __( 'Default template with image', 'auxin-elements' ),
                    'bordered'  => __( 'Bordered on content', 'auxin-elements' ),
                    'quote'     => __( 'Quotation mark on top of the content', 'auxin-elements' ),
                    'info-top'  => __( 'Show info on top of content', 'auxin-elements' ),
                    'image-top' => __( 'Show image on top of the content', 'auxin-elements' )
                    /*
                    'default'    => array(
                        'label'    => __( 'Default template', 'auxin-elements' ),
                        'image'    => AUXELS_ADMIN_URL . '/assets/images/visual-select/testimonial-1.svg'
                    ),
                    'def-img'  => array(
                        'label'    => __( 'Default template with image', 'auxin-elements' ),
                        'image'    => AUXELS_ADMIN_URL . '/assets/images/visual-select/testimonial-2.svg'
                    ),
                    'bordered'  => array(
                        'label'    => __( 'Bordered on content', 'auxin-elements' ),
                        'image'    => AUXELS_ADMIN_URL . '/assets/images/visual-select/testimonial-3.svg'
                    ),
                    'quote'  => array(
                        'label'    => __( 'Quotation mark on top of the content', 'auxin-elements' ),
                        'image'    => AUXELS_ADMIN_URL . '/assets/images/visual-select/testimonial-4.svg'
                    ),
                    'info-top'  => array(
                        'label'    => __( 'Show info on top of content', 'auxin-elements' ),
                        'image'    => AUXELS_ADMIN_URL . '/assets/images/visual-select/testimonial-5.svg'
                    ),
                    'image-top'  => array(
                        'label'    => __( 'Show image on top of the content', 'auxin-elements' ),
                        'image'    => AUXELS_ADMIN_URL . '/assets/images/visual-select/testimonial-6.svg'
                    )*/
                ),
                'default'     => 'image-top'
            )
        );

        $this->add_control(
            'show_image',
            array(
                'label'        => __('Display image','auxin-elements' ),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => __( 'On', 'auxin-elements' ),
                'label_off'    => __( 'Off', 'auxin-elements' ),
                'default'      => 'yes'
            )
        );

        $this->add_control(
            'customer_img',
            array(
                'label'      => __('Customer Image','auxin-elements' ),
                'type'       => Controls_Manager::MEDIA,
                'show_label' => false,
                'default'    => array(
                    'url' => Utils::get_placeholder_image_src()
                ),
                'condition'  => array(
                    'show_image' => 'yes'
                )
            )
        );

        $this->add_group_control(
            Group_Control_Image_Size::get_type(),
            array(
                'name'       => 'customer_img', // Usage: `{name}_size` and `{name}_custom_dimension`, in this case `thumbnail_size` and `thumbnail_custom_dimension`.
                'exclude'    => array( 'custom' ),
                'separator'  => 'none',
                'default'    => 'thumbnail',
                'condition'  => array(
                    'show_image' => 'yes'
                )
            )
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'content_section',
            array(
                'label'      => __('Content', 'auxin-elements' ),
            )
        );

        $this->add_control(
            'title',
            array(
                'label'       => __('Customer Name','auxin-elements'),
                'label_block' => true,
                'type'        => Controls_Manager::TEXT,
                'default'     => 'John Doe'
            )
        );

        $this->add_control(
            'subtitle',
            array(
                'label'       => __('Customer Occupation','auxin-elements'),
                'label_block' => true,
                'type'        => Controls_Manager::TEXT,
                'default'     => 'Manager'
            )
        );

        $this->add_control(
            'link',
            array(
                'label'         => __('Customer Link','auxin-elements'),
                'type'          => Controls_Manager::URL,
                'show_external' => false,
                'placeholder'   => 'http://phlox.pro'
            )
        );

        $this->add_control(
            'rating',
            array(
                'label'       => __('Customer Rating','auxin-elements'),
                'label_block' => true,
                'type'        => Controls_Manager::SELECT,
                'default'     => 'none',
                'options'     => array(
                    'none' => __( 'None'  , 'auxin-elements' ),
                    '1'    => '1',
                    '2'    => '2',
                    '3'    => '3',
                    '4'    => '4',
                    '5'    => '5',
                )
            )
        );

        $this->add_control(
            'content',
            array(
                'label'       => __('Review','auxin-elements'),
                'type'        => Controls_Manager::TEXTAREA,
                'rows'        => '10',
                'default'     => 'Click edit button to change this text. Collaboratively drive collaborative solutions with flexible e-services. Conveniently supply technically sound process improvements.'
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  Image Style Section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'section_image_border',
            array(
                'label' => __( 'Image', 'auxin-elements' ),
                'tab' => Controls_Manager::TAB_STYLE
            )
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            array(
                'name'      => 'image_border',
                'selector'  => '{{WRAPPER}} .aux-testimonial-image img',
                'separator' => 'before'
            )
        );

        $this->add_responsive_control(
            'image_width',
            array(
                'label'      => __( 'Width', 'auxin-elements' ),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => array( 'px', '%' ),
                'range'      => array(
                    'px' => array(
                        'min' => 0,
                        'max' => 1000
                    ),
                    '%' => array(
                        'min' => 0,
                        'max' => 100
                    )
                ),
                'selectors' => array(
                    '{{WRAPPER}} .aux-widget-testimonial .aux-testimonial-image' => 'width:{{SIZE}}{{UNIT}};'
                )
            )
        );

        $this->add_control(
            'image_border_radius',
            array(
                'label'      => __( 'Border radius', 'auxin-elements' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => array( 'px', '%' ),
                'selectors'  => array(
                    '{{WRAPPER}} .aux-testimonial-image img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; overflow:hidden;'
                ),
                'default' => array(
                    'unit'     => '%',
                    'top'      => '100',
                    'right'    => '100',
                    'bottom'   => '100',
                    'left'     => '100',
                    'isLinked' => true
                ),
                'allowed_dimensions' => 'all'
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  Title Style Section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'title_style_section',
            array(
                'label'     => __( 'Name', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => array(
                    'title!' => '',
                ),
            )
        );

        $this->start_controls_tabs( 'title_colors' );

        $this->start_controls_tab(
            'title_color_normal',
            array(
                'label' => __( 'Normal' , 'auxin-elements' ),
                'condition' => array(
                    'title!' => '',
                ),
            )
        );

        $this->add_control(
            'title_color',
            array(
                'label'     => __( 'Color', 'auxin-elements' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .col-title a, {{WRAPPER}} .col-title' => 'color: {{VALUE}} !important;',
                ),
                'condition' => array(
                    'title!' => '',
                ),
            )
        );

        $this->end_controls_tab();

        $this->start_controls_tab(
            'title_color_hover',
            array(
                'label' => __( 'Hover' , 'auxin-elements' ),
                'condition' => array(
                    'title!' => '',
                ),
            )
        );

        $this->add_control(
            'title_hover_color',
            array(
                'label'     => __( 'Color', 'auxin-elements' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .col-title a:hover' => 'color: {{VALUE}} !important;',
                ),
                'condition' => array(
                    'title!' => '',
                ),
            )
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            array(
                'name'      => 'title_typography',
                'scheme'    => Scheme_Typography::TYPOGRAPHY_1,
                'selector'  => '{{WRAPPER}} .col-title, {{WRAPPER}} .col-title a',
                'condition' => array(
                    'title!' => ''
                )
            )
        );

        $this->add_responsive_control(
            'title_margin',
            array(
                'label'              => __( 'Top and bottom space', 'auxin-elements' ),
                'type'               => Controls_Manager::DIMENSIONS,
                'size_units'         => array( 'px', 'em' ),
                'allowed_dimensions' => 'vertical',
                'selectors'          => array(
                    '{{WRAPPER}} .col-title' => 'margin-top:{{TOP}}{{UNIT}}; margin-bottom:{{BOTTOM}}{{UNIT}};'
                ),
                'condition' => array(
                    'title!' => ''
                )
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  subtitle_style_section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'subtitle_style_section',
            array(
                'label'     => __( 'Occupation', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => array(
                    'subtitle!' => ''
                )
            )
        );

        $this->add_control(
            'subtitle_color',
            array(
                'label'     => __( 'Color', 'auxin-elements' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .col-subtitle' => 'color: {{VALUE}} !important;',
                ),
                'condition' => array(
                    'subtitle!' => '',
                ),
            )
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            array(
                'name'      => 'subtitle_typography',
                'scheme'    => Scheme_Typography::TYPOGRAPHY_1,
                'selector'  => '{{WRAPPER}} .col-subtitle',
                'condition' => array(
                    'subtitle!' => ''
                )
            )
        );

        $this->add_responsive_control(
            'subtitle_margin_bottom',
            array(
                'label' => __( 'Bottom space', 'auxin-elements' ),
                'type'  => Controls_Manager::SLIDER,
                'range' => array(
                    'px' => array(
                        'max' => 100
                    )
                ),
                'selectors' => array(
                    '{{WRAPPER}} .col-subtitle' => 'margin-bottom: {{SIZE}}{{UNIT}};'
                ),
                'condition' => array(
                    'subtitle!' => ''
                )
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  content_style_section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'content_style_section',
            array(
                'label'     => __( 'Review', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => array(
                    'content!' => ''
                )
            )
        );

        $this->add_control(
            'content_color',
            array(
                'label'     => __( 'Color', 'auxin-elements' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .aux-testimonial-content' => 'color: {{VALUE}} !important;'
                ),
                'condition' => array(
                    'content!' => ''
                )
            )
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            array(
                'name'     => 'content_typography',
                'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
                'selector' => '{{WRAPPER}} .aux-testimonial-content',
                'condition' => array(
                    'content!' => ''
                )
            )
        );

        $this->add_responsive_control(
            'content_margin',
            array(
                'label'              => __( 'Top and bottom space', 'auxin-elements' ),
                'type'               => Controls_Manager::DIMENSIONS,
                'size_units'         => array( 'px', 'em' ),
                'allowed_dimensions' => 'vertical',
                'selectors'          => array(
                    '{{WRAPPER}} .aux-testimonial-content .entry-content' => 'margin-top:{{TOP}}{{UNIT}}; margin-bottom:{{BOTTOM}}{{UNIT}};'
                )
            )
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            array(
                'name'      => 'content_border',
                'selector'  => '{{WRAPPER}} .aux-testimonial-content',
                'separator' => 'none'
            )
        );

        $this->add_responsive_control(
            'content_border_radius',
            array(
                'label'      => __( 'Border radius', 'auxin-elements' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => array( 'px' ),
                'selectors'  => array(
                    '{{WRAPPER}} .aux-testimonial-content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                )
            )
        );

        $this->add_responsive_control(
            'content_padding',
            array(
                'label'      => __( 'Padding', 'auxin-elements' ),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => array( 'px', '%' ),
                'selectors'  => array(
                    '{{WRAPPER}} .aux-testimonial-content .entry-content' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                )
            )
        );

        $this->end_controls_section();

        /*-----------------------------------------------------------------------------------*/
        /*  Rating Style Section
        /*-----------------------------------------------------------------------------------*/

        $this->start_controls_section(
            'rating_style_section',
            array(
                'label'     => __( 'Rating', 'auxin-elements' ),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => array(
                    'rating!' => 'none'
                )
            )
        );


        $this->add_control(
            'rating_empty_color',
            array(
                'label'     => __( 'Empty Color', 'auxin-elements' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .aux-rating-box.aux-star-rating::before' => 'color: {{VALUE}} !important;'
                )
            )
        );

        $this->add_control(
            'rating_fill_color',
            array(
                'label'     => __( 'Fill Color', 'auxin-elements' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => array(
                    '{{WRAPPER}} .aux-rating-box.aux-star-rating span::before' => 'color: {{VALUE}} !important;'
                )
            )
        );

        $this->add_responsive_control(
            'rating_size',
            array(
                'label'      => __( 'Size', 'auxin-elements' ),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => array( 'px', 'em', 'rem' ),
                'range' => array(
                    'px' => array(
                        'min' => 1,
                        'max' => 200
                    )
                ),
                'selectors' => array(
                    '{{WRAPPER}} .aux-star-rating' => 'font-size: {{SIZE}}{{UNIT}};'
                )
            )
        );

        $this->add_responsive_control(
            'rating_margin_bottom',
            array(
                'label' => __( 'Bottom space', 'auxin-elements' ),
                'type'  => Controls_Manager::SLIDER,
                'range' => array(
                    'px' => array(
                        'max' => 100
                    )
                ),
                'selectors' => array(
                    '{{WRAPPER}} .aux-star-rating' => 'margin-bottom: {{SIZE}}{{UNIT}};'
                )
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

    $settings   = $this->get_settings_for_display();

    $args       = array(
        'template'     => $settings['template'],
        'image_html'   => Group_Control_Image_Size::get_attachment_image_html( $settings, 'customer_img' ),
        'image_size'   => $settings['customer_img_size'],

        'title'        => $settings['title'],
        'subtitle'     => $settings['subtitle'],
        'link'         => $settings['link']['url'],
        'rating'       => $settings['rating'],
        'content'      => $settings['content']
    );

    // pass the args through the corresponding shortcode callback
    echo auxin_widget_testimonial_callback( $args );

  }

}