<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('url')->unique(); // Unique URL for the image
            $table->string('name')->nullable(); // Name of the image
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete(); // Foreign key to users table
            $table->foreignId('article_id')->nullable()->constrained()->cascadeOnDelete(); // Nullable foreign key to articles table
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
