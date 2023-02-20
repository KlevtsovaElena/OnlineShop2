<?php



final class Message extends AbstractClasses\Unit
{

    use Traits\IdTrait;
    
    const TABLE = 'messages';

    public function content() : string
    {
        return $this->getField('content');
    }


}