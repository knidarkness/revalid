// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E check-config wrong config type extension in assertions 1`] = `

Deprecated plugin format detected: type-extension
[1] redocly.yaml:10:13 at #/rules/rule~1metadata-lifecycle/subject/type

\`type\` can be one of the following only: "any", "Root", "Tag", "TagList", "TagGroups", "TagGroup", "ExternalDocs", "Example", "ExamplesMap", "EnumDescriptions", "SecurityRequirement", "SecurityRequirementList", "Info", "Contact", "License", "Logo", "Paths", "PathItem", "Parameter", "ParameterItems", "ParameterList", "Operation", "Examples", "Header", "Responses", "Response", "Schema", "Xml", "SchemaProperties", "NamedSchemas", "NamedResponses", "NamedParameters", "NamedSecuritySchemes", "SecurityScheme", "XCodeSample", "XCodeSampleList", "XServerList", "XServer", "Server", "ServerList", "ServerVariable", "ServerVariablesMap", "Callback", "CallbacksMap", "RequestBody", "MediaTypesMap", "MediaType", "Encoding", "EncodingMap", "HeadersMap", "Link", "DiscriminatorMapping", "Discriminator", "Components", "LinksMap", "NamedExamples", "NamedRequestBodies", "NamedHeaders", "NamedLinks", "NamedCallbacks", "ImplicitFlow", "PasswordFlow", "ClientCredentials", "AuthorizationCode", "OAuth2Flows", "XUsePkce", "WebhooksMap", "XMetaData", "PatternProperties", "NamedPathItems", "DependentRequired", "HttpServerBinding", "HttpChannelBinding", "HttpMessageBinding", "HttpOperationBinding", "WsServerBinding", "WsChannelBinding", "WsMessageBinding", "WsOperationBinding", "KafkaServerBinding", "KafkaTopicConfiguration", "KafkaChannelBinding", "KafkaMessageBinding", "KafkaOperationBinding", "AnypointmqServerBinding", "AnypointmqChannelBinding", "AnypointmqMessageBinding", "AnypointmqOperationBinding", "AmqpServerBinding", "AmqpChannelBinding", "AmqpMessageBinding", "AmqpOperationBinding", "Amqp1ServerBinding", "Amqp1ChannelBinding", "Amqp1MessageBinding", "Amqp1OperationBinding", "MqttServerBindingLastWill", "MqttServerBinding", "MqttChannelBinding", "MqttMessageBinding", "MqttOperationBinding", "Mqtt5ServerBinding", "Mqtt5ChannelBinding", "Mqtt5MessageBinding", "Mqtt5OperationBinding", "NatsServerBinding", "NatsChannelBinding", "NatsMessageBinding", "NatsOperationBinding", "JmsServerBinding", "JmsChannelBinding", "JmsMessageBinding", "JmsOperationBinding", "SolaceServerBinding", "SolaceChannelBinding", "SolaceMessageBinding", "SolaceDestination", "SolaceOperationBinding", "StompServerBinding", "StompChannelBinding", "StompMessageBinding", "StompOperationBinding", "RedisServerBinding", "RedisChannelBinding", "RedisMessageBinding", "RedisOperationBinding", "MercureServerBinding", "MercureChannelBinding", "MercureMessageBinding", "MercureOperationBinding", "ServerBindings", "ChannelBindings", "MessageBindings", "OperationBindings", "ServerMap", "ChannelMap", "Channel", "ParametersMap", "MessageExample", "NamedMessages", "NamedMessageTraits", "NamedOperationTraits", "NamedCorrelationIds", "SecuritySchemeFlows", "Message", "OperationTrait", "OperationTraitList", "MessageTrait", "MessageTraitList", "MessageExampleList", "CorrelationId", "Dependencies", "OperationReply", "OperationReplyAddress", "NamedTags", "NamedExternalDocs", "NamedChannels", "NamedOperations", "NamedOperationReplies", "NamedOperationRelyAddresses", "SecuritySchemeList", "MessageList", "SourceDescriptions", "OpenAPISourceDescription", "NoneSourceDescription", "ArazzoSourceDescription", "Parameters", "ReusableObject", "Workflows", "Workflow", "Steps", "Step", "Replacement", "ExtendedOperation", "ExpectSchema", "Outputs", "CriterionObject", "XPathCriterion", "JSONPathCriterion", "SuccessActionObject", "OnSuccessActionList", "FailureActionObject", "OnFailureActionList", "NamedInputs", "NamedSuccessActions", "NamedFailureActions", "SpecExtension".

 8 | rule/metadata-lifecycle:
 9 |   subject:
10 |     type: WrongXMetaData
   |           ^^^^^^^^^^^^^^
11 |     property: 'lifecycle'
12 |   assertions:

Error was generated by the configuration spec rule.


❌ Your config has 1 error.


`;
