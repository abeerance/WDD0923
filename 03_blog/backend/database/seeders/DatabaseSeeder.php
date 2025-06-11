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
            'Road Trip',
            'Photography',
            'Wildlife',
            'Mountains',
            'Desert',
            'Islands'
        ];

        $tags = [];
        foreach ($tagNames as $name) {
            $tags[$name] = Tag::create(['name' => $name]);
        }

        // Create travel images - each article gets its own matching image
        ////////////////////////////////////////////////////////////////////////////
        $images = [
            // Articles 1-10
            Image::create(['name' => 'Kyoto Temple', 'url' => 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Santorini Coastline', 'url' => 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Machu Picchu', 'url' => 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Norwegian Fjords', 'url' => 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'New York Skyline', 'url' => 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Tokyo Street Food', 'url' => 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Swiss Alps', 'url' => 'https://plus.unsplash.com/premium_photo-1689084892324-fd8822cb97c1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'Bali Beach', 'url' => 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Iceland Ring Road', 'url' => 'https://images.unsplash.com/photo-1491451412778-3e2c8b766720?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'Dubai Cityscape', 'url' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', 'user_id' => 1]),


            // Articles 11-20
            Image::create(['name' => 'Southeast Asia Backpacking', 'url' => 'https://images.unsplash.com/photo-1648540389107-909e6624078c?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'Canadian Rockies Camping', 'url' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Kenya Safari', 'url' => 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Morocco Sahara Desert', 'url' => 'https://images.unsplash.com/photo-1516895065658-70aaefea6765?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'New Zealand Landscape', 'url' => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Cinque Terre Italy', 'url' => 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Maldives Resort', 'url' => 'https://images.unsplash.com/photo-1682308999971-208126ba75ec?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'Scottish Highland Castle', 'url' => 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Costa Rica Wildlife', 'url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Australian Outback', 'url' => 'https://images.unsplash.com/photo-1587045554011-af22ff815a76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),

            // Articles 21-28
            Image::create(['name' => 'Paris Cafe', 'url' => 'https://plus.unsplash.com/premium_photo-1665669263531-cdcbe18e7fe4?q=80&w=2125&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'Patagonia Mountains', 'url' => 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Vietnam Motorbike', 'url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Seychelles Beach', 'url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Nepal Everest', 'url' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Trans-Siberian Railway', 'url' => 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Jordan Petra', 'url' => 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'user_id' => 1]),
            Image::create(['name' => 'Croatian Islands', 'url' => 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop', 'user_id' => 1]),

            // Extra images for other users
            Image::create(['name' => 'Brazil Carnival', 'url' => 'https://images.unsplash.com/photo-1516834321653-1c72a8e57f8f?w=800&h=600&fit=crop', 'user_id' => 2]),
            Image::create(['name' => 'Antarctica Expedition', 'url' => 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop', 'user_id' => 3]),
        ];

        // 25+ Articles for User 1 to test pagination - each with matching image
        ////////////////////////////////////////////////////////////////////////////
        $articlesForUser1 = [
            ['title' => 'Exploring Ancient Temples in Kyoto', 'lead' => 'A journey through Japan\'s historic capital reveals timeless beauty and spiritual wonder.', 'date' => '2025-03-15', 'tags' => ['Culture', 'City Break'], 'image_index' => 0],
            ['title' => 'Santorini: The Perfect Greek Island Getaway', 'lead' => 'Experience the magic of Santorini\'s dramatic cliffs and breathtaking sunsets.', 'date' => '2025-04-22', 'tags' => ['Beach', 'Luxury'], 'image_index' => 1],
            ['title' => 'Hiking the Inca Trail to Machu Picchu', 'lead' => 'Follow ancient pathways through cloud forests to discover the lost city of the Incas.', 'date' => '2025-01-18', 'tags' => ['Hiking', 'Adventure'], 'image_index' => 2],
            ['title' => 'Road Trip Through Norway\'s Fjords', 'lead' => 'Navigate winding roads to explore Norway\'s dramatic fjord landscapes.', 'date' => '2025-02-10', 'tags' => ['Road Trip', 'Adventure'], 'image_index' => 3],
            ['title' => 'A Weekend in New York City: The Ultimate Guide', 'lead' => 'Make the most of 72 hours in the Big Apple with iconic landmarks and culinary experiences.', 'date' => '2025-05-01', 'tags' => ['City Break', 'Food'], 'image_index' => 4],
            ['title' => 'Tokyo Street Food Adventure', 'lead' => 'Discover the incredible world of Japanese street food in Tokyo\'s bustling neighborhoods.', 'date' => '2025-03-20', 'tags' => ['Food', 'City Break'], 'image_index' => 5],
            ['title' => 'Swiss Alps: A Photographer\'s Paradise', 'lead' => 'Capture stunning mountain vistas and pristine alpine lakes in Switzerland.', 'date' => '2025-04-05', 'tags' => ['Photography', 'Mountains'], 'image_index' => 6],
            ['title' => 'Bali Beach Hopping Guide', 'lead' => 'From hidden coves to famous surf breaks, explore Bali\'s diverse coastline.', 'date' => '2025-02-28', 'tags' => ['Beach', 'Islands'], 'image_index' => 7],
            ['title' => 'Iceland\'s Ring Road: Complete Travel Guide', 'lead' => 'Drive around Iceland to witness geysers, glaciers, and the Northern Lights.', 'date' => '2025-01-25', 'tags' => ['Road Trip', 'Adventure'], 'image_index' => 8],
            ['title' => 'Dubai: Where Tradition Meets Luxury', 'lead' => 'Experience the perfect blend of Arabian culture and modern extravagance.', 'date' => '2025-03-08', 'tags' => ['Luxury', 'City Break'], 'image_index' => 9],
            ['title' => 'Backpacking Through Southeast Asia', 'lead' => 'A budget traveler\'s guide to exploring Thailand, Vietnam, and Cambodia.', 'date' => '2025-02-14', 'tags' => ['Backpacking', 'Adventure'], 'image_index' => 10],
            ['title' => 'Canadian Rockies Camping Experience', 'lead' => 'Sleep under the stars in Banff and Jasper National Parks.', 'date' => '2025-04-18', 'tags' => ['Camping', 'Mountains'], 'image_index' => 11],
            ['title' => 'Safari in Kenya: Wildlife Photography Tips', 'lead' => 'Capture the Big Five and witness the Great Migration in the Maasai Mara.', 'date' => '2025-01-30', 'tags' => ['Wildlife', 'Photography'], 'image_index' => 12],
            ['title' => 'Morocco Desert Adventure', 'lead' => 'Camel trekking and overnight camping in the Sahara Desert.', 'date' => '2025-03-12', 'tags' => ['Desert', 'Adventure'], 'image_index' => 13],
            ['title' => 'New Zealand South Island Road Trip', 'lead' => 'Epic landscapes and adrenaline activities in Middle Earth.', 'date' => '2025-04-25', 'tags' => ['Road Trip', 'Adventure'], 'image_index' => 14],
            ['title' => 'Italian Riviera: Cinque Terre Hiking', 'lead' => 'Walk coastal trails connecting five colorful fishing villages.', 'date' => '2025-02-20', 'tags' => ['Hiking', 'Culture'], 'image_index' => 15],
            ['title' => 'Maldives: Ultimate Luxury Resort Guide', 'lead' => 'Overwater bungalows and pristine beaches in tropical paradise.', 'date' => '2025-03-28', 'tags' => ['Luxury', 'Beach'], 'image_index' => 16],
            ['title' => 'Scottish Highlands Castle Tour', 'lead' => 'Explore ancient castles and dramatic landscapes in Scotland.', 'date' => '2025-01-22', 'tags' => ['Culture', 'Road Trip'], 'image_index' => 17],
            ['title' => 'Costa Rica Wildlife Adventure', 'lead' => 'Zip-lining through cloud forests and spotting exotic animals.', 'date' => '2025-04-08', 'tags' => ['Wildlife', 'Adventure'], 'image_index' => 18],
            ['title' => 'Australian Outback Expedition', 'lead' => 'Experience the raw beauty of Australia\'s red center and Uluru.', 'date' => '2025-02-05', 'tags' => ['Desert', 'Adventure'], 'image_index' => 19],
            ['title' => 'Paris Food Walking Tour', 'lead' => 'Taste your way through the City of Light\'s best neighborhoods.', 'date' => '2025-03-18', 'tags' => ['Food', 'City Break'], 'image_index' => 20],
            ['title' => 'Patagonia Trekking Guide', 'lead' => 'Multi-day hikes through Chile and Argentina\'s pristine wilderness.', 'date' => '2025-01-28', 'tags' => ['Hiking', 'Mountains'], 'image_index' => 21],
            ['title' => 'Vietnam Motorbike Journey', 'lead' => 'Two weeks exploring Vietnam from north to south on a motorbike.', 'date' => '2025-04-12', 'tags' => ['Road Trip', 'Backpacking'], 'image_index' => 22],
            ['title' => 'Seychelles Island Paradise', 'lead' => 'Crystal clear waters and pristine beaches in the Indian Ocean.', 'date' => '2025-02-25', 'tags' => ['Beach', 'Islands'], 'image_index' => 23],
            ['title' => 'Nepal Everest Base Camp Trek', 'lead' => 'Journey to the base of the world\'s highest mountain.', 'date' => '2025-03-22', 'tags' => ['Hiking', 'Mountains'], 'image_index' => 24],
            ['title' => 'Russian Trans-Siberian Railway', 'lead' => 'Epic train journey across the world\'s largest country.', 'date' => '2025-04-15', 'tags' => ['Culture', 'Adventure'], 'image_index' => 25],
            ['title' => 'Jordan: Petra and Wadi Rum Adventure', 'lead' => 'Ancient cities and desert landscapes in the Middle East.', 'date' => '2025-01-15', 'tags' => ['Culture', 'Desert'], 'image_index' => 26],
            ['title' => 'Croatian Island Hopping', 'lead' => 'Sail the Adriatic and discover hidden coves and historic towns.', 'date' => '2025-03-25', 'tags' => ['Islands', 'Beach'], 'image_index' => 27],
        ];

        // Create articles for User 1
        foreach ($articlesForUser1 as $articleData) {
            $date = $articleData['date'];
            $title = $articleData['title'];
            $slug = $date . '-' . Str::slug($title);

            $article = Article::create([
                'title' => $title,
                'lead' => $articleData['lead'],
                'slug' => $slug,
                'content' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => $articleData['lead'] . ' This is sample content for testing pagination and article display.']]
                        ]
                    ]
                ]),
                'user_id' => 1, // All articles for user 1
                'image_id' => $images[$articleData['image_index']]->id,
            ]);

            // Attach tags
            foreach ($articleData['tags'] as $tagName) {
                if (isset($tags[$tagName])) {
                    $article->tags()->attach($tags[$tagName]->id);
                }
            }
        }

        // A few articles for other users
        $otherArticles = [
            ['title' => 'Brazilian Carnival Experience', 'lead' => 'Samba, music, and vibrant culture in Rio de Janeiro.', 'date' => '2025-03-05', 'tags' => ['Culture', 'City Break'], 'user_id' => 2, 'image_index' => 28],
            ['title' => 'Antarctic Expedition Cruise', 'lead' => 'Wildlife encounters at the bottom of the world.', 'date' => '2025-02-18', 'tags' => ['Wildlife', 'Adventure'], 'user_id' => 3, 'image_index' => 29],
        ];

        foreach ($otherArticles as $articleData) {
            $date = $articleData['date'];
            $title = $articleData['title'];
            $slug = $date . '-' . Str::slug($title);

            $article = Article::create([
                'title' => $title,
                'lead' => $articleData['lead'],
                'slug' => $slug,
                'content' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => $articleData['lead']]]
                        ]
                    ]
                ]),
                'user_id' => $articleData['user_id'],
                'image_id' => $images[$articleData['image_index']]->id,
            ]);

            foreach ($articleData['tags'] as $tagName) {
                if (isset($tags[$tagName])) {
                    $article->tags()->attach($tags[$tagName]->id);
                }
            }
        }

        // Comments for Articles
        ////////////////////////////////////////////////////////////////////////////
        $comments = [
            ['content' => 'Great article! I visited Kyoto last year and it was incredible.', 'article_id' => 1, 'user_id' => 2],
            ['content' => 'The Fushimi Inari Shrine was my favorite part of Kyoto.', 'article_id' => 1, 'user_id' => 3],
            ['content' => 'Santorini is on my bucket list. The photos look amazing!', 'article_id' => 2, 'user_id' => 2],
            ['content' => 'Amazing content! Keep up the great work.', 'article_id' => 3, 'user_id' => 3],
            ['content' => 'This makes me want to travel right now!', 'article_id' => 4, 'user_id' => 2],
        ];

        foreach ($comments as $commentData) {
            Comment::create($commentData);
        }
    }
}
