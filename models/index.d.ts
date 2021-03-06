import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Report {
  readonly id: string;
  readonly upload_date?: string;
  readonly xlsxToJSONStr?: string;
  readonly xlsxToJSONObj?: string;
  readonly xlsxToJSONArrObj?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Report>);
  static copyOf(source: Report, mutator: (draft: MutableModel<Report>) => MutableModel<Report> | void): Report;
}

export declare class Salesteam {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Salesteam>);
  static copyOf(source: Salesteam, mutator: (draft: MutableModel<Salesteam>) => MutableModel<Salesteam> | void): Salesteam;
}

export declare class Campaign {
  readonly id: string;
  readonly clientID?: string;
  readonly name?: string;
  readonly reference?: string;
  readonly booking_type?: string;
  readonly contact_person?: string;
  readonly add_comm_type?: string;
  readonly add_comm_value?: number;
  readonly instructions?: string;
  readonly delivery_comments?: string;
  readonly date_created?: string;
  readonly date_modified?: string;
  readonly status?: string;
  readonly revenue_cpm?: boolean;
  readonly revenue_cpc?: boolean;
  readonly revenue_cpcv?: boolean;
  readonly revenue_cpview?: boolean;
  readonly revenue_cpvisit?: boolean;
  readonly revenue_cpl?: boolean;
  readonly revenue_cpa?: boolean;
  readonly revenue_cpi?: boolean;
  readonly revenue_cps?: boolean;
  readonly video_campaign?: boolean;
  readonly video_startDate?: string;
  readonly video_endDate?: string;
  readonly video_unitRate?: number;
  readonly video_goal?: number;
  readonly video_budget?: number;
  readonly video_revType?: string;
  readonly display_campaign?: boolean;
  readonly display_startDate?: string;
  readonly display_endDate?: string;
  readonly display_unitRate?: number;
  readonly display_goal?: number;
  readonly display_budget?: number;
  readonly display_revType?: string;
  readonly native_campaign?: boolean;
  readonly native_startDate?: string;
  readonly native_endDate?: string;
  readonly native_unitRate?: number;
  readonly native_goal?: number;
  readonly native_budget?: number;
  readonly native_revType?: string;
  readonly search_campaign?: boolean;
  readonly search_startDate?: string;
  readonly search_endDate?: string;
  readonly search_unitRate?: number;
  readonly search_goal?: number;
  readonly search_budget?: number;
  readonly search_revType?: string;
  readonly social_campaign?: boolean;
  readonly social_startDate?: string;
  readonly social_endDate?: string;
  readonly social_unitRate?: number;
  readonly social_goal?: number;
  readonly social_budget?: number;
  readonly social_revType?: string;
  readonly highImpact_campaign?: boolean;
  readonly highImpact_startDate?: string;
  readonly highImpact_endDate?: string;
  readonly highImpact_unitRate?: number;
  readonly highImpact_goal?: number;
  readonly highImpact_budget?: number;
  readonly highImpact_revType?: string;
  readonly richMedia_campaign?: boolean;
  readonly richMedia_startDate?: string;
  readonly richMedia_endDate?: string;
  readonly richMedia_unitRate?: number;
  readonly richMedia_goal?: number;
  readonly richMedia_budget?: number;
  readonly richMedia_revType?: string;
  readonly pop_campaign?: boolean;
  readonly pop_startDate?: string;
  readonly pop_endDate?: string;
  readonly pop_unitRate?: number;
  readonly pop_goal?: number;
  readonly pop_budget?: number;
  readonly pop_revType?: string;
  readonly push_campaign?: boolean;
  readonly push_startDate?: string;
  readonly push_endDate?: string;
  readonly push_unitRate?: number;
  readonly push_goal?: number;
  readonly push_budget?: number;
  readonly push_revType?: string;
  readonly BO_file?: string;
  readonly clientName?: string;
  readonly platforms?: string;
  readonly allowed_sales_manager_email?: string;
  readonly reference_id_video_campaign?: string;
  readonly reference_id_display_campaign?: string;
  readonly reference_id_social_campaign?: string;
  readonly reference_id_richMedia_campaign?: string;
  readonly reference_id_pop_campaign?: string;
  readonly reference_id_push_campaign?: string;
  readonly reference_id_highImpact_campaign?: string;
  readonly reference_id_search_campaign?: string;
  readonly reference_id_native_campaign?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Campaign>);
  static copyOf(source: Campaign, mutator: (draft: MutableModel<Campaign>) => MutableModel<Campaign> | void): Campaign;
}

export declare class Client {
  readonly id: string;
  readonly name?: string;
  readonly client_type?: string;
  readonly country?: string;
  readonly address?: string;
  readonly website?: string;
  readonly non_person_email?: string;
  readonly billing_contact_name?: string;
  readonly billing_contact_email?: string;
  readonly tax_id?: string;
  readonly main_contact_name?: string;
  readonly main_contact_email?: string;
  readonly main_contact_phone?: string;
  readonly skype_or_gmeet?: string;
  readonly sales_manager_email?: string;
  readonly account_manager?: string;
  readonly kickback_type?: string;
  readonly kickback_value?: string;
  readonly billing_entity?: string;
  readonly date_created?: string;
  readonly date_modified?: string;
  readonly Campaigns?: (Campaign | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Client>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void): Client;
}