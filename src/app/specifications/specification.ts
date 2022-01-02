export abstract class Specification<T> {
    isSatisfiedBy(entity: T): boolean {
        return this.expression(entity);
    }

    abstract expression(entity: T): boolean;

    and(specification: Specification<T>): Specification<T> {
        return new AndSpecification(this, specification);
    }

    or(specification: Specification<T>): Specification<T> {
        return new OrSpecification(this, specification);
    }

    not(): Specification<T> {
        return new NotSpecification(this);
    }
}

class AndSpecification<T> extends Specification<T> {
    constructor(private left: Specification<T>, private right: Specification<T>) {
        super();
    }

    expression(entity: T): boolean {
        return this.left.isSatisfiedBy(entity) && this.right.isSatisfiedBy(entity);
    }
}

class OrSpecification<T> extends Specification<T> {
    constructor(private left: Specification<T>, private right: Specification<T>) {
        super();
    }

    expression(entity: T): boolean {
        return this.left.isSatisfiedBy(entity) || this.right.isSatisfiedBy(entity);
    }
}

class NotSpecification<T> extends Specification<T> {
    constructor(private specification: Specification<T>) {
        super();

    }

    expression(entity: T): boolean {
        return !this.specification.isSatisfiedBy(entity);
    }
}
