import { CaseEntity, Entity, Prop, PropType } from "@casejs/case";
import { faker } from "@faker-js/faker";

@Entity({
  nameSingular: "customer",
  namePlural: "customers",
  propIdentifier: "name",
  slug: "customers",
})
export class Customer extends CaseEntity {
  @Prop({
    type: PropType.Image,
  })
  logo: string;

  @Prop({
    type: PropType.Text,
    seed: () => faker.company.name(),
  })
  name: string;

  @Prop({
    type: PropType.Text,
    seed: () =>
      faker.location.streetAddress() +
      ", " +
      faker.location.city() +
      ", " +
      faker.location.state() +
      " " +
      faker.location.zipCode(),
  })
  address: string;
}
