import React from "react";

import { useEffect } from "react";
import $ from 'jquery';

import Responsiveness from "./Responsiveness";
import NoResponsiveness from "./NoResponsiveness";
import SearchModel from "./SearchModel";

function NavBar(props) {
    useEffect(() => {
        $('.collapse').on('shown.bs.collapse', function () {
            $(this).prev().addClass('active');
        });

        $('.collapse').on('hidden.bs.collapse', function () {
            $(this).prev().removeClass('active');
        });

        //Canvas Menu
        $(".canvas__open").on('click', function () {
            $(".offcanvas-menu-wrapper").addClass("active");
            $(".offcanvas-menu-overlay").addClass("active");
        });

        $(".offcanvas-menu-overlay").on('click', function () {
            $(".offcanvas-menu-wrapper").removeClass("active");
            $(".offcanvas-menu-overlay").removeClass("active");
        });

        $('.search-switch').on('click', function () {
            $('.search-model').fadeIn(400);
        });

        $('.search-close-switch').on('click', function () {
            $('.search-model').fadeOut(400, function () {
                $('#search-input').val('');
            });
        });
    });

    return (
        <div>
            <Responsiveness user={props.user} />
            <NoResponsiveness user={props.user} />
            <SearchModel />
        </div>
    );
}

export default NavBar;