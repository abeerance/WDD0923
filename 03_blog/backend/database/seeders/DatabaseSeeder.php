<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\User;

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
            $tags[] = Tag::create(['name' => $name]);
        }

        // Articles for a Travel Blog
        ////////////////////////////////////////////////////////////////////////////
        for ($i = 0; $i < 10; $i++) {
            $article = Article::create([
                'title' => fake()->sentence(),
                'content' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => fake()->paragraph()]]],
                    ],
                ]),
                'user_id' => random_int(1, 3),
            ]);

            // Attach random tags (1 to 3) to each article
            $article->tags()->attach(
                collect($tags)->random(random_int(1, 3))->pluck('id')->toArray()
            );
        }

        // Comments for Articles
        ////////////////////////////////////////////////////////////////////////////
        for ($i = 0; $i < 20; $i++) {
            Comment::create([
                'content' => fake()->sentence(5),
                'article_id' => random_int(1, 10),
                'user_id' => random_int(1, 3),
            ]);
        }
    }
}
