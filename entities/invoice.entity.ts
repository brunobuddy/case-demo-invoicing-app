import { BeforeInsert, CaseEntity, Entity, Prop, PropType } from "@casejs/case";
import { faker } from "@faker-js/faker";
import { Customer } from "./customer.entity";
import * as moment from "moment";

@Entity({
  nameSingular: "invoice",
  namePlural: "invoices",
  propIdentifier: "reference",
  slug: "invoices",
})
export class Invoice extends CaseEntity {
  @Prop({
    type: PropType.Text,
    options: {
      isHiddenInCreateEdit: true,
    },
    seed: () =>
      `INV-${faker.date.recent().getFullYear()}-${faker.date
        .recent()
        .getMonth()}-${faker.date.recent().getDay()}-${faker.number.int({
        max: 10,
      })}`,
  })
  reference: string;

  @Prop({
    type: PropType.Text,
  })
  label: string;

  @Prop({
    type: PropType.Date,
    label: "Issue Date",
  })
  issueDate: Date;

  @Prop({
    type: PropType.Relation,
    options: {
      entity: Customer,
    },
  })
  customer: Customer;

  @Prop({
    type: PropType.Currency,
  })
  amount: number;

  @Prop({
    type: PropType.Currency,
  })
  taxes: number;

  @Prop({
    type: PropType.File,
    options: {
      isHiddenInCreateEdit: true,
    },
  })
  path: string;

  @BeforeInsert()
  beforeInsert() {
    this.reference = `INV-${this._relations.customer.name
      .slice(0, 3)
      .toUpperCase()}-${moment(this.issueDate).format("YYYY-MM-DD")}`;
  }
}
