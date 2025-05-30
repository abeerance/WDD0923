<?php

namespace Spatie\TypeScriptTransformer\Transformers;

use ReflectionClass;
use ReflectionEnum;
use ReflectionEnumBackedCase;
use Spatie\TypeScriptTransformer\Structures\TransformedType;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;

class EnumTransformer implements Transformer
{
    public function __construct(protected TypeScriptTransformerConfig $config)
    {
    }

    public function transform(ReflectionClass $class, string $name): ?TransformedType
    {
        if (! $class->isEnum()) {
            return null;
        }

        $enum = (new ReflectionEnum($class->getName()));

        if (! $enum->isBacked()) {
            return null;
        }

        if (empty($enum->getCases())) {
            return null;
        }

        return $this->config->shouldTransformToNativeEnums()
            ? $this->toEnum($enum, $name)
            : $this->toType($enum, $name);
    }

    protected function toEnum(ReflectionEnum $enum, string $name): TransformedType
    {
        $options = array_map(
            fn (ReflectionEnumBackedCase $case) => "{$case->getName()} = {$this->toEnumValue($case)}",
            $enum->getCases()
        );

        return TransformedType::create(
            $enum,
            $name,
            implode(', ', $options),
            keyword: 'enum'
        );
    }

    protected function toType(ReflectionEnum $enum, string $name): TransformedType
    {
        $options = array_map(
            fn (ReflectionEnumBackedCase $case) => $this->toEnumValue($case),
            $enum->getCases(),
        );

        return TransformedType::create(
            $enum,
            $name,
            implode(' | ', $options)
        );
    }

    protected function toEnumValue(ReflectionEnumBackedCase $case): string
    {
        $value = $case->getBackingValue();

        if (! is_string($value)) {
            return "{$value}";
        }

        $escaped = strtr($value, [
            '\\' => '\\\\',
            '\'' => '\\\'',
        ]);

        return "'{$escaped}'";
    }
}
