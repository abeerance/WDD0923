<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\User;
use App\Models\Image;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        ////////////////////////////////////////////////////////////////////////////
        User::create([
            'email' => 'alpha@mailinator.com',
            'username' => 'alpha',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'email' => 'bravo@mailinator.com',
            'username' => 'bravo',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'email' => 'charlie@mailinator.com',
            'username' => 'charlie',
            'password' => bcrypt('password'),
        ]);

        // Tags for a Travel Blog
        ////////////////////////////////////////////////////////////////////////////
        $tagNames = [
            'Adventure',
            'Beach',
            'Hiking',
            'Camping',
            'City Break',
            'Culture',
            'Food',
            'Luxury',
            'Backpacking',
            'Road Trip'
        ];

        $tags = [];
        foreach ($tagNames as $name) {
            $tags[$name] = Tag::create(['name' => $name]);
        }

        // Create travel images
        ////////////////////////////////////////////////////////////////////////////
        $images = [
            Image::create([
                'name' => 'Kyoto Temple',
                'url' => 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
                'user_id' => 1,
            ]),
            Image::create([
                'name' => 'Santorini Coastline',
                'url' => 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
                'user_id' => 2,
            ]),
            Image::create([
                'name' => 'Machu Picchu',
                'url' => 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
                'user_id' => 3,
            ]),
            Image::create([
                'name' => 'Norwegian Fjords',
                'url' => 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38',
                'user_id' => 1,
            ]),
            Image::create([
                'name' => 'New York Skyline',
                'url' => 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25',
                'user_id' => 2,
            ]),
        ];

        // Articles for a Travel Blog with proper content
        ////////////////////////////////////////////////////////////////////////////
        $articles = [
            [
                'title' => 'Exploring Ancient Temples in Kyoto',
                'date' => '2025-03-15',
                'tags' => ['Culture', 'City Break'],
                'user_id' => 1,
                'image_id' => $images[0]->id,
                'content' => [
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 2],
                            'content' => [['type' => 'text', 'text' => 'A Journey Through Time in Kyoto']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'Kyoto, once the capital of Japan, is home to thousands of ancient temples and shrines. Walking through the bamboo groves of Arashiyama and visiting the iconic Fushimi Inari Shrine with its thousands of vermilion torii gates was a transformative experience.']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'The city perfectly balances ancient traditions with modern convenience. I spent my mornings exploring temples like Kinkaku-ji (the Golden Pavilion) and my evenings enjoying matcha tea ceremonies and local cuisine in the Gion district.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 3],
                            'content' => [['type' => 'text', 'text' => 'Must-Visit Temples']]
                        ],
                        [
                            'type' => 'bulletList',
                            'content' => [
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Kiyomizu-dera Temple']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Fushimi Inari Shrine']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Kinkaku-ji (Golden Pavilion)']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Ryoan-ji Temple']]]]],
                            ]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'The best time to visit Kyoto is during spring for cherry blossoms or fall for autumn colors, though the city has a unique beauty in every season.']]
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Santorini: The Perfect Greek Island Getaway',
                'date' => '2025-04-22',
                'tags' => ['Beach', 'Luxury'],
                'user_id' => 2,
                'image_id' => $images[1]->id,
                'content' => [
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'With its iconic white-washed buildings and blue domes perched on dramatic cliffs overlooking the Aegean Sea, Santorini is the quintessential Greek island paradise.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 2],
                            'content' => [['type' => 'text', 'text' => 'Island Magic']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'The sunsets in Oia are legendary for a reason. Each evening, crowds gather along the western edge of the island to witness one of the most spectacular natural shows on earth as the sun dips below the horizon, painting the sky in shades of orange, pink, and purple.']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'Beyond the stunning vistas, Santorini offers beautiful black and red sand beaches, fascinating archaeological sites like Ancient Thira, and some of the most unique wines in the world, grown in the island\'s volcanic soil.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 3],
                            'content' => [['type' => 'text', 'text' => 'Highlights']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'A catamaran cruise around the caldera, swimming in the hot springs, and dining on fresh seafood at a taverna overlooking the water are must-do experiences on this magical island.']]
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Hiking the Inca Trail to Machu Picchu',
                'date' => '2025-01-18',
                'tags' => ['Hiking', 'Adventure'],
                'user_id' => 3,
                'image_id' => $images[2]->id,
                'content' => [
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 2],
                            'content' => [['type' => 'text', 'text' => 'The Journey of a Lifetime']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'The classic four-day Inca Trail hike to Machu Picchu is one of the world\'s greatest trekking experiences. The trail winds through diverse landscapes, including cloud forests, alpine tundra, and stunning mountain passes, before culminating at the Sun Gate with your first glimpse of the lost city of the Incas.']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'Along the way, you\'ll discover ancient Incan ruins that most visitors to Peru never see, camp under the stars in the Andes, and forge unforgettable bonds with your fellow trekkers and local guides.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 3],
                            'content' => [['type' => 'text', 'text' => 'Preparation Tips']]
                        ],
                        [
                            'type' => 'bulletList',
                            'content' => [
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Book permits at least 6 months in advance']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Spend at least 2-3 days in Cusco to acclimatize to the altitude']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Train with a loaded backpack and on stairs before your trip']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Pack layers - temperatures can vary dramatically']]]]],
                            ]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'While challenging, completing the Inca Trail gives you a profound appreciation for the engineering genius of the Inca civilization and a deep connection to the sacred landscape of the Andes.']]
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Road Trip Through Norway\'s Fjords',
                'date' => '2025-02-10',
                'tags' => ['Road Trip', 'Adventure'],
                'user_id' => 1,
                'image_id' => $images[3]->id,
                'content' => [
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'Norway\'s fjords offer some of the most dramatic landscapes on the planet. Deep, narrow inlets of water surrounded by towering cliffs and cascading waterfalls create a scene of unparalleled natural beauty.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 2],
                            'content' => [['type' => 'text', 'text' => 'The Ultimate Scenic Drive']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'Our two-week road trip began in Oslo and took us through the western fjords, including the UNESCO-listed Geirangerfjord and Nærøyfjord. The roads themselves are engineering marvels, winding along cliff edges, through mountain tunnels, and across dizzying bridges.']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'Highlights included the hairpin turns of Trollstigen (the Troll\'s Path), the panoramic views from Dalsnibba viewpoint, and the wooden stave churches dating back to the Viking age.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 3],
                            'content' => [['type' => 'text', 'text' => 'Best Fjords to Visit']]
                        ],
                        [
                            'type' => 'bulletList',
                            'content' => [
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Geirangerfjord - Famous for Seven Sisters waterfall']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Sognefjord - Norway\'s longest and deepest fjord']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Hardangerfjord - Known for apple orchards and glaciers']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Lysefjord - Home to the famous Pulpit Rock']]]]],
                            ]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'While summer offers the midnight sun and easier driving conditions, a winter visit provides a chance to see the northern lights dancing above the fjords - truly a magical experience.']]
                        ],
                    ],
                ],
            ],
            [
                'title' => 'A Weekend in New York City: The Ultimate Guide',
                'date' => '2025-05-01',
                'tags' => ['City Break', 'Food'],
                'user_id' => 2,
                'image_id' => $images[4]->id,
                'content' => [
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 2],
                            'content' => [['type' => 'text', 'text' => 'The City That Never Sleeps']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'New York City packs more into a few square miles than most entire countries. From world-class museums and Broadway shows to iconic landmarks and diverse neighborhoods, the city offers an overwhelming array of experiences.']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'My 72-hour whirlwind tour included sunrise at the Empire State Building, a morning walk through Central Park, afternoon exploring the Metropolitan Museum of Art, and evenings enjoying the city\'s legendary dining and nightlife scenes.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 3],
                            'content' => [['type' => 'text', 'text' => 'Must-Visit Neighborhoods']]
                        ],
                        [
                            'type' => 'bulletList',
                            'content' => [
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Greenwich Village - For bohemian charm and jazz clubs']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Williamsburg - For hipster vibes and artisanal everything']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Chinatown & Little Italy - For cultural immersion and incredible food']]]]],
                                ['type' => 'listItem', 'content' => [['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => 'Upper East Side - For museums and upscale shopping']]]]],
                            ]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'The subway is your best friend for getting around quickly and authentically. Purchase a MetroCard and experience the city like a true New Yorker, complete with memorable encounters with street performers, buskers, and the city\'s famously direct inhabitants.']]
                        ],
                        [
                            'type' => 'heading',
                            'attrs' => ['level' => 3],
                            'content' => [['type' => 'text', 'text' => 'Food Highlights']]
                        ],
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => 'From dollar pizza slices and halal food carts to Michelin-starred restaurants, New York\'s food scene is unparalleled. Don\'t miss a classic bagel with lox, dim sum in Chinatown, and a pastrami sandwich from Katz\'s Deli.']]
                        ],
                    ],
                ],
            ],
        ];

        // Create the articles
        foreach ($articles as $articleData) {
            // Format date and create slug
            $date = $articleData['date'];
            $title = $articleData['title'];
            $slug = $date . '/' . Str::slug($title);

            // Create the article
            $article = Article::create([
                'title' => $title,
                'slug' => $slug,
                'content' => json_encode($articleData['content']),
                'user_id' => $articleData['user_id'],
                'image_id' => $articleData['image_id'],
            ]);

            // Attach tags
            foreach ($articleData['tags'] as $tagName) {
                $article->tags()->attach($tags[$tagName]->id);
            }
        }

        // Comments for Articles
        ////////////////////////////////////////////////////////////////////////////
        $comments = [
            ['content' => 'Great article! I visited Kyoto last year and it was incredible.', 'article_id' => 1, 'user_id' => 2],
            ['content' => 'The Fushimi Inari Shrine was my favorite part of Kyoto.', 'article_id' => 1, 'user_id' => 3],
            ['content' => 'Santorini is on my bucket list. The photos look amazing!', 'article_id' => 2, 'user_id' => 1],
            ['content' => 'Did you try the local wines in Santorini? Any recommendations?', 'article_id' => 2, 'user_id' => 3],
            ['content' => 'How difficult was the Inca Trail? I\'m planning to go next year.', 'article_id' => 3, 'user_id' => 1],
            ['content' => 'Make sure to book your permits way in advance for the Inca Trail!', 'article_id' => 3, 'user_id' => 2],
            ['content' => 'Norway is absolutely stunning. Did you see the Northern Lights?', 'article_id' => 4, 'user_id' => 3],
            ['content' => 'What was the driving like on those narrow Norwegian roads?', 'article_id' => 4, 'user_id' => 2],
            ['content' => 'I lived in NYC for 5 years and still never saw everything. Great guide!', 'article_id' => 5, 'user_id' => 1],
            ['content' => 'Don\'t forget to check out the High Line and Chelsea Market in NYC!', 'article_id' => 5, 'user_id' => 3],
        ];

        foreach ($comments as $commentData) {
            Comment::create($commentData);
        }
    }
}
