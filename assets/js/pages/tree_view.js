$(function () {



    /* Simple tree with colored icons  */
    $('#tree1').jstree({
        'core': {
            'data': [{
                'text': 'My pictures',
                "icon": "far fa-image c-red",
                'state': {
                    'selected': false
                }
            }, {
                'text': 'My videos',
                "icon": "fas fa-film c-orange",
                'state': {
                    'opened': true,
                    'selected': false
                },
                'children': [{
                    'text': 'Video 1',
                    "icon": "fas fa-film c-orange"
                }, {
                    'text': 'Video 2',
                    "icon": "fas fa-film c-orange"
                }]
            }, {
                'text': 'My documents',
                "icon": "far fa-folder c-purple",
                'state': {
                    'selected': false
                },
                'children': [{
                    'text': 'Document 1',
                    "icon": "far fa-folder c-purple",
                }, {
                    'text': 'Document 2',
                    "icon": "far fa-folder c-purple",
                }]
            }, {
                'text': 'Events',
                "icon": "fas fa-calendar-alt c-green",
                'state': {
                    'opened': false,
                    'selected': false
                }
            }, {
                'text': 'Messages',
                "icon": "far fa-envelope",
                'state': {
                    'opened': false,
                    'selected': false
                }
            }, ]
        }
    });

    /*  Tree with checkbox option  */
    $('#tree2').jstree({
        'core': {
            'data': [{
                'text': 'My pictures',
                "icon": "far fa-image",
                'state': {
                    'selected': false
                }
            }, {
                'text': 'My videos',
                "icon": "fas fa-film",
                'state': {
                    'opened': true,
                    'selected': false
                },
                'children': [{
                    'text': 'Video 1',
                    "icon": "fas fa-film"
                }, {
                    'text': 'Video 2',
                    "icon": "fas fa-film"
                }]
            }, {
                'text': 'My documents',
                "icon": "far fa-folder",
                'state': {
                    'selected': false
                },
                'children': [{
                    'text': 'Document 1',
                    "icon": "far fa-folder",
                }, {
                    'text': 'Document 2',
                    "icon": "far fa-folder",
                }]
            }, {
                'text': 'Events',
                "icon": "fas fa-calendar-alt",
                'state': {
                    'opened': false,
                    'selected': false
                }
            }, {
                'text': 'Messages',
                "icon": "far fa-envelope",
                'state': {
                    'opened': false,
                    'selected': false
                }
            }, ]
        },
        "plugins": ["checkbox"],
    });

    /*  Tree with drag & drop  */
    $('#tree3').jstree({
        'core': {
            "check_callback": true,
            'data': [{
                    'text': 'My pictures',
                    "icon": "far fa-image c-primary",
                    'state': {
                        'selected': false
                    }
                }, {
                    'text': 'My videos',
                    "icon": "fas fa-film c-primary",
                    'state': {
                        'opened': true,
                        'selected': false
                    },
                    'children': [{
                        'text': 'Video 1',
                        "icon": "fas fa-film c-primary"
                    }, {
                        'text': 'Video 2',
                        "icon": "fas fa-film c-primary"
                    }]
                }, {
                    'text': 'My documents',
                    "icon": "far fa-folder c-primary",
                    'state': {
                        'selected': false
                    },
                    'children': [{
                        'text': 'Document 1',
                        "icon": "far fa-folder c-primary",
                    }, {
                        'text': 'Document 2',
                        "icon": "far fa-folder c-primary",
                    }]
                }, {
                    'text': 'Events',
                    "icon": "fas fa-calendar-alt c-primary",
                    'state': {
                        'opened': false,
                        'selected': false
                    }
                }, {
                    'text': 'Messages',
                    "icon": "far fa-envelope c-primary",
                    'state': {
                        'opened': false,
                        'selected': false
                    }
                },

            ]
        },
        "plugins": ["dnd"]
    });


});