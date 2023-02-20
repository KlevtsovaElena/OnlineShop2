<?php

namespace Traits;

trait IdTrait
{
    public function getId() : ?int
    {
            return $this->getField('id');
    }
}