<template>
<div class="main-container">
    <div class="container-fluid mt-3">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Organisations</h1>
        </div>

        <nav class="navbar navbar-expand-lg navbar-light m-0 p-0">

            <!-- Navbar collapse button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarOrganisations" aria-controls="navbarOrganisations" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- /Navbar collapse button -->

            <!-- Navbar items -->
            <div class="collapse navbar-collapse" id="navbarOrganisations">

                <!-- Create new organisation button -->
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a @click.prevent="newOrganisation" class="btn btn-success btn-icon-split btn-block my-2" href="#">
                            <span class="icon text-white-50 d-none d-md-inline">
                                <i class="fas fa-file-alt"></i>
                            </span>
                            <span class="text pl-2">Create New</span>
                        </a>
                    </li>
                </ul>
                <!-- /Create new organisation button -->

            </div>
            <!-- /Navbar items -->

        </nav>

        <!-- No active organisation warning message -->
        <div v-if="this.activeOrganisation == 0" class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="alert-heading">You have no active organisation selected!</h4>
            <p>Pease select and activate an organisation before trying to continue.  If you have only 1 organisation linked to your account then that organisation will be 
               selected as your default active organisation.  
            </p>
        </div>
        <!-- /No active organisation warning message -->
 
        <!-- Page Content -->
        <div class="row mt-2">

            <!-- Organisation Card -->
            <div v-for="organisation in organisationListing.data" :key="organisation.ID" class="col-12 col-md-6 col-lg-3 mb-4" style="min-width: 325px">
                <div :class="getCardClass(organisation.activeOrganisation, organisation.active)"  v-show="organisation.recStatus==0" class="card shadow-sm h-100 py-0">

                     <!-- Card header -->
                    <div class="card-header pb-0 m-0 d-flex flex-row align-items-center justify-content-between border-0 bg-white">
                        <!-- Organisation name -->
                        <h5 class="m-0 p-0 text-primary">
                            {{ organisation.name }}
                        </h5>

                        <!-- Header dropdown menu -->
                        <div class="dropdown no-arrow">
                            <a class="dropdown-toggle" id="dropdownMenuLink" role="button" aria-expanded="false" aria-haspopup="true" href="#" data-toggle="dropdown">
                                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <!-- Header dropdown items -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in">
                                <!-- Display only when active -->
                                <a v-if="organisation.IsDeactivate == 1" @click.prevent="deactivateOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-stop fa-sm fa-fw mr-2 text-gray-400 hover-text-gray-150"></i>
                                    Deactivate
                                </a>
                                <!-- Display only when enabled and not active -->
                                <a v-if="organisation.IsActivate == 1" @click.prevent="activateOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-play fa-sm fa-fw mr-2 text-gray-400 hover-text-gray-150"></i>
                                    Activate
                                </a>
                                <!-- Display only when active and user is an administrator of the organisation -->
                                <a v-if="organisation.IsDisable == 1" @click.prevent="disableOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-toggle-off fa-sm fa-fw mr-2 text-gray-400 hover-text-gray-150"></i>
                                    Disable
                                </a>
                                <!-- Display only when not active and user is an administrator of the organisation -->
                                <a v-if="organisation.IsEnable == 1" @click.prevent="enableOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-toggle-on fa-sm fa-fw mr-2 text-gray-400 hover-text-gray-150"></i>
                                    Enable
                                </a>
                                <div class="dropdown-divider"></div>
                                <!-- Display always -->
                                <a v-if="organisation.IsView == 1" @click.prevent="viewOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-address-card fa-sm fa-fw mr-2 text-gray-400"></i>
                                    View
                                </a>
                                <!-- Display only when user is an administrator of the organisation -->
                                <a v-if="organisation.IsEdit == 1" @click.prevent="editOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-edit fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Edit
                                </a> 
                                <!-- Display only when not active and user is an administrator of the organisation -->
                                <div v-if="organisation.IsUnlink == 1 || organisation.IsDelete == 1" class="dropdown-divider"></div>
                                <a v-if="organisation.IsUnlink == 1" @click.prevent="unlinkOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-unlink fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Un-link
                                </a>
                                <a v-if="organisation.IsDelete == 1" @click.prevent="deleteOrganisation(organisation)" class="dropdown-item" href="#">
                                    <i class="fas fa-trash-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Delete
                                </a>
                            </div>
                            <!-- /Header dropdown items -->

                        </div>
                        <!-- /Header dropdown menu -->

                    </div>
                    <!-- /Card header -->

                    <!-- Card body -->
                    <div class="card-body xpt-0 mt-0">
                        <div class="row no-gutters">
                            <div class="col-4 pr-4">
                                 
                                <img :src="getCardIcon(organisation)" class="img img-fluid">
                            </div>
 
                            <div class="col-8 text-truncate">

                                <!-- Organisation details -->
                                <div class="row no-gutters">
                                    <ul class="ml-0 mb-0 fa-ul text-muted">
                                        <li v-if="organisation.phone" class="small">
                                            <div class="col-12 text-xs text-secondary text-truncate p-0">
                                                phone: 
                                                <a class="text-xs" :href="'tel:'+organisation.phone_1" :title="organisation.phone_1">
                                                    {{ organisation.phone_1 }} &nbsp;
                                                </a>
                                            </div>
                                        </li>
                                        <li v-if="organisation.email" class="small">
                                            <div class="col-12 text-xs text-secondary text-truncate p-0">
                                                mail: 
                                                <a class="text-xs" :href="'mailto:'+organisation.email" :title="organisation.email">
                                                    {{ organisation.email }} &nbsp;
                                                </a>
                                            </div>                        
                                        </li>
                                        <li v-if="organisation.web" class="small">
                                            <div class="col-12 text-xs text-secondary text-truncate p-0">
                                                web: 
                                                <a class="text-xs" :href="organisation.web" :title="organisation.web">
                                                    {{ organisation.web }} &nbsp;
                                                </a>
                                            </div>                        
                                        </li> 
                                        <li v-if="organisation.address" class="small">
                                            <div class="col-12 text-xs text-secondary text-wrap p-0 pt-2">
                                                <p>{{ organisation.address }}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <!-- /Organisation details -->

                            </div>
                        
                        </div>
                    </div>
                    <!-- /Card body -->



                </div>
            </div>
            <!-- /Organisation Card -->

        </div>
        <!-- /Page Content -->

        <pagination :data="organisationListing" @pagination-change-page="get_organisationListing" :show-disabled="true"></pagination>

    </div>

        <!-- Modal Organisation -->
        <form id="formOrganisation" @submit.prevent="saveOrganisation()">
            <div class="modal fade" id="organisationModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="false">
                <div class="modal-dialog modal-dialog-centered modal-lg" style= "min-height: 600px;" role="document">
                    <div class="modal-content" style= "min-height: 640px;">

                        <!-- Modal Header-->
                        <div class="modal-header">
                            <h5 class="modal-title d-lg-none" id="organisationModalTitle">{{ this.form.name }}</h5>
                            <h5 class="modal-title d-none d-lg-block" id="organisationModalTitle">{{ this.form.status + ' Organisation [' + this.form.name + ']' }}</h5>
                            <button type="button" class="close activeBtn" @click="closeOrganisation">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- /Modal Header-->

                        <!-- Modal Body-->
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <div class="row">

                                            <!-- Modal Menu -->
                                            <div class="col-12 col-md-2 mb-2">
                                                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <a class="nav-link active" id="v-pills-details-tab" data-toggle="pill" href="#v-pills-details" role="tab" aria-controls="v-pills-details" aria-selected="true">Details</a>
                                                    <a class="nav-link" id="v-pills-logo-tab" data-toggle="pill" href="#v-pills-logo" role="tab" aria-controls="v-pills-logo" aria-selected="false">Logo</a>
                                                    <a class="nav-link" id="v-pills-notes-tab" data-toggle="pill" href="#v-pills-notes" role="tab" aria-controls="v-pills-notes" aria-selected="false">Notes</a>
                                                    <a class="nav-link" id="v-pills-contacts-tab" data-toggle="pill" href="#v-pills-contacts" role="tab" aria-controls="v-pills-contacts" aria-selected="false">Contacts</a>
                                                    <a class="nav-link" id="v-pills-addresses-tab" data-toggle="pill" href="#v-pills-addresses" role="tab" aria-controls="v-pills-addresses" aria-selected="false">Addresses</a>
                                                    <a v-if="this.form.status != 'View'" class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                                                </div>
                                            </div>
                                            <!-- /Modal Menu -->
                                            
                                            <!-- Image preview -->
                                            <div v-show="this.form.iconFile || this.form.iconFile64" class="card mt-2 btn-block border-0" >
                                                <img :src="getCompanyIcon()" class="mx-auto m-4 border-0 w-100">
                                            </div>
                                            <!-- /Image preview -->                                             

                                        </div>
                                    </div>

                                    <div class="col-12 col-md-8">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="tab-content" id="v-pills-tabContent">

                                                    <!-- Organisation details page -->
                                                    <div class="tab-pane fade show active" id="v-pills-details" role="tabpanel">
                                                        <h5 class="card-title">Organisation Details</h5>
                                                        <hr/>
                                                        <!-- Organisation name -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Name:</span>
                                                            </div>
                                                            <input v-model="form.name" type="text" name="name" placeholder="" autocomplete="name" 
                                                            class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                        <!-- Organisation alias -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Alias:</span>
                                                            </div>
                                                            <input v-model="form.alias" type="text" name="alias" placeholder="" autocomplete="alias" 
                                                            class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                        <hr/>
                                                        <!-- Organisation phone 1 -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Phone 1:</span>
                                                            </div>
                                                            <input v-model="form.phone_1" type="text" name="phone_1" placeholder="" autocomplete="phone_1"
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                        <!-- Organisation phone 2 -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Phone 2:</span>
                                                            </div>
                                                            <input v-model="form.phone_2" type="text" name="phone_2" placeholder="" autocomplete="phone_2"
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                        <!-- Organisation phone 3 -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Phone 3:</span>
                                                            </div>
                                                            <input v-model="form.phone_3" type="text" name="phone_3" placeholder="" autocomplete="phone_3"
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>                                                        
                                                        <hr/>
                                                        <!-- Organisation email -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Email:</span>
                                                            </div>
                                                            <input v-model="form.email" type="text" name="email" placeholder="" autocomplete="email"
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                        <!-- Organisation web address -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Web:</span>
                                                            </div>
                                                            <input v-model="form.web" type="text" name="web" placeholder="" autocomplete="web"
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                    </div>
                                                    <!-- /Organisation details page -->

                                                    <!-- Logo page -->
                                                    <div class="tab-pane fade show" id="v-pills-logo" role="tabpanel">
                                                        <h5 class="card-title">Logo</h5>
                                                        <hr/>
                                                        <!-- Upload input -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text input-group-prepend-100"><font style="font-size:11pt ">Logo:</font></span>
                                                            </div>
                                                            <div class="custom-file">
                                                                <input @change="uploadLogo" type="file" name="iconFile" autocomplete="iconFile"
                                                                    class="custom-file-input" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                <label class="custom-file-label" for="inputGroupFile01">{{ this.form.preIconFile }}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- /Logo page -->

                                                    <!-- Organisation notes page -->
                                                    <div class="tab-pane fade show" id="v-pills-notes" role="tabpanel">
                                                        <h5 class="card-title">General Notes</h5>
                                                        <hr/>
                                                        <!-- Note dropdown type menu -->
                                                        <div class="dropdown">
                                                            <button class="btn btn-secondary dropdown-toggle btn-block mb-2 activeBtn" type="button" id="dropdownMenuButton_notes" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Select: Notes
                                                            </button>
                                                            <div class="dropdown-menu">
                                                                <div class="nav flex-column nav-pills" id="v-pills-tabNotes" role="tablist" aria-orientation="vertical">
                                                                    <a class="nav-link active" id="v-pills-genNotes-tab" data-toggle="pill" href="#v-pills-genNotes" role="tab" aria-controls="v-pills-genNotes" aria-selected="true">Notes</a>
                                                                    <a class="nav-link" id="v-pills-about-tab" data-toggle="pill" href="#v-pills-about" role="tab" aria-controls="v-pills-about" aria-selected="false">About</a>
                                                                    <a class="nav-link" id="v-pills-terms-tab" data-toggle="pill" href="#v-pills-terms" role="tab" aria-controls="v-pills-terms" aria-selected="false">Terms</a>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                        <!-- /Note dropdown type menu -->


                                                        <!-- Note content -->
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <div class="tab-content" id="v-pills-tabNotes_Content">

                                                                    <!-- Notes page -->
                                                                    <div class="tab-pane fade show active" id="v-pills-genNotes"  role="tabpanel" style="height: 350px">
                                                                        <div class="input-group h-100 mt-2">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Notes:</span>
                                                                            </div>
                                                                            <textarea v-model="form.generalNotes" class="form-control h-100"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Notes page -->

                                                                    <!-- About page -->
                                                                    <div class="tab-pane fade" id="v-pills-about"  role="tabpanel" style="height: 350px">
                                                                        <div class="input-group h-100 mt-2">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">About:</span>
                                                                            </div>
                                                                            <textarea v-model="form.about" class="form-control h-100"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <!-- /About page -->

                                                                    <!-- Terms page -->
                                                                    <div class="tab-pane fade" id="v-pills-terms" role="tabpanel" style="height: 350px">
                                                                        <div class="input-group h-100 mt-2">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Terms:</span>
                                                                            </div>
                                                                            <textarea v-model="form.terms" class="form-control h-100" aria-label="With textarea"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Terms page -->

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Note content -->











                                                    </div>
                                                    <!-- /Organisation notes page -->

                                                   <!-- Contacts page -->
                                                    <div class="tab-pane fade show" id="v-pills-contacts" role="tabpanel">
                                                        <h5 class="card-title">Contacts</h5>
                                                        <hr/>
                                                        <!-- Contacts dropdown type menu -->
                                                        <div class="dropdown">
                                                            <button class="btn btn-secondary dropdown-toggle btn-block activeBtn" type="button" id="dropdownMenuButton_contacts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Select: Contact Type
                                                            </button>
                                                            <div class="dropdown-menu">
                                                                <div class="nav flex-column nav-pills" id="v-pills-tabContacts" role="tablist" aria-orientation="vertical">
                                                                    <a class="nav-link active" id="v-pills-contact1-tab" data-toggle="pill" href="#v-pills-contact1" role="tab" aria-controls="v-pills-contact1" aria-selected="true">Contact 1</a>
                                                                    <a class="nav-link" id="v-pills-contact2-tab" data-toggle="pill" href="#v-pills-contact2" role="tab" aria-controls="v-pills-contact2" aria-selected="false">Contact 2</a>
                                                                    <a class="nav-link" id="v-pills-contact3-tab" data-toggle="pill" href="#v-pills-contact3" role="tab" aria-controls="v-pills-contact3" aria-selected="false">Contact 3</a>
                                                                    <a class="nav-link" id="v-pills-contact4-tab" data-toggle="pill" href="#v-pills-contact4" role="tab" aria-controls="v-pills-contact4" aria-selected="false">Contact 4</a>
                                                                    <a class="nav-link" id="v-pills-contact5-tab" data-toggle="pill" href="#v-pills-contact5" role="tab" aria-controls="v-pills-contact5" aria-selected="false">Contact 5</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Contacts dropdown type menu -->

                                                        <!-- Contacts content -->
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <div class="tab-content" id="v-pills-tabContacts_Content">

                                                                    <!-- Contacts 1 page -->
                                                                    <div class="tab-pane fade show active" id="v-pills-contact1" role="tabpanel">
                                                                        <!-- Contact description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.contactDescr_1" type="text" name="contactDescr_1" id="inputContactDescr_1" placeholder="" autocomplete="contactDescr_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="contactDescription()">
                                                                        </div>
                                                                        <!-- Contact name -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Name:</span>
                                                                            </div>
                                                                            <input v-model="form.contactName_1" type="text" name="contactName_1" placeholder="" autocomplete="contactName_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact phone -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Phone:</span>
                                                                            </div>
                                                                            <input v-model="form.contactPhone_1" type="text" name="contactPhone_1" placeholder="" autocomplete="contactPhone_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact mobile -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Mobile:</span>
                                                                            </div>
                                                                            <input v-model="form.contactMobile_1" type="text" name="contactMobile_1" placeholder="" autocomplete="contactMobile_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact fax -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Fax:</span>
                                                                            </div>
                                                                            <input v-model="form.contactFax_1" type="text" name="contactFax_1" placeholder="" autocomplete="contactFax_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact email -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Email:</span>
                                                                            </div>
                                                                            <input v-model="form.contactEmail_1" type="text" name="contactEmail_1" placeholder="" autocomplete="contactEmail_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact web -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Web:</span>
                                                                            </div>
                                                                            <input v-model="form.contactWeb_1" type="text" name="contactWeb_1" placeholder="" autocomplete="contactWeb_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- Contacts 1 page -->

                                                                    <!-- Contacts 2 page -->
                                                                    <div class="tab-pane fade" id="v-pills-contact2" role="tabpanel">
                                                                        <!-- Contact description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.contactDescr_2" type="text" name="contactDescr_2" id="inputContactDescr_2" placeholder="" autocomplete="contactDescr_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="contactDescription()">
                                                                        </div>
                                                                        <!-- Contact name -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Name:</span>
                                                                            </div>
                                                                            <input v-model="form.contactName_2" type="text" name="contactName_2" placeholder="" autocomplete="contactName_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact phone -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Phone:</span>
                                                                            </div>
                                                                            <input v-model="form.contactPhone_2" type="text" name="contactPhone_2" placeholder="" autocomplete="contactPhone_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact mobile -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Mobile:</span>
                                                                            </div>
                                                                            <input v-model="form.contactMobile_2" type="text" name="contactMobile_2" placeholder="" autocomplete="contactMobile_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact fax -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Fax:</span>
                                                                            </div>
                                                                            <input v-model="form.contactFax_2" type="text" name="contactFax_2" placeholder="" autocomplete="contactFax_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact email -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Email:</span>
                                                                            </div>
                                                                            <input v-model="form.contactEmail_2" type="text" name="contactEmail_2" placeholder="" autocomplete="contactEmail_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact web -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Web:</span>
                                                                            </div>
                                                                            <input v-model="form.contactWeb_2" type="text" name="contactWeb_2" placeholder="" autocomplete="contactWeb_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Contacts 2 page -->

                                                                    <!-- Contacts 3 page -->
                                                                    <div class="tab-pane fade" id="v-pills-contact3" role="tabpanel">
                                                                        <!-- Contact description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.contactDescr_3" type="text" name="contactDescr_3" id="inputContactDescr_3" placeholder="" autocomplete="contactDescr_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="contactDescription()">
                                                                        </div>
                                                                        <!-- Contact name -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Name:</span>
                                                                            </div>
                                                                            <input v-model="form.contactName_3" type="text" name="contactName_3" placeholder="" autocomplete="contactName_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact phone -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Phone:</span>
                                                                            </div>
                                                                            <input v-model="form.contactPhone_3" type="text" name="contactPhone_3" placeholder="" autocomplete="contactPhone_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact mobile -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Mobile:</span>
                                                                            </div>
                                                                            <input v-model="form.contactMobile_3" type="text" name="contactMobile_3" placeholder="" autocomplete="contactMobile_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact fax -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Fax:</span>
                                                                            </div>
                                                                            <input v-model="form.contactFax_3" type="text" name="contactFax_3" placeholder="" autocomplete="contactFax_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact email -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Email:</span>
                                                                            </div>
                                                                            <input v-model="form.contactEmail_3" type="text" name="contactEmail_3" placeholder="" autocomplete="contactEmail_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact web -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Web:</span>
                                                                            </div>
                                                                            <input v-model="form.contactWeb_3" type="text" name="contactWeb_3" placeholder="" autocomplete="contactWeb_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Contacts 3 page -->

                                                                    <!-- Contacts4 page -->
                                                                    <div class="tab-pane fade" id="v-pills-contact4" role="tabpanel">
                                                                        <!-- Contact description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.contactDescr_4" type="text" name="contactDescr_4" id="inputContactDescr_4" placeholder="" autocomplete="contactDescr_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="contactDescription()">
                                                                        </div>
                                                                        <!-- Contact name -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Name:</span>
                                                                            </div>
                                                                            <input v-model="form.contactName_4" type="text" name="contactName_4" placeholder="" autocomplete="contactName_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact phone -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Phone:</span>
                                                                            </div>
                                                                            <input v-model="form.contactPhone_4" type="text" name="contactPhone_4" placeholder="" autocomplete="contactPhone_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact mobile -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Mobile:</span>
                                                                            </div>
                                                                            <input v-model="form.contactMobile_4" type="text" name="contactMobile_4" placeholder="" autocomplete="contactMobile_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact fax -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Fax:</span>
                                                                            </div>
                                                                            <input v-model="form.contactFax_4" type="text" name="contactFax_4" placeholder="" autocomplete="contactFax_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact email -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Email:</span>
                                                                            </div>
                                                                            <input v-model="form.contactEmail_4" type="text" name="contactEmail_4" placeholder="" autocomplete="contactEmail_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact web -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Web:</span>
                                                                            </div>
                                                                            <input v-model="form.contactWeb_4" type="text" name="contactWeb_4" placeholder="" autocomplete="contactWeb_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- Contacts 4 page -->

                                                                    <!-- Contacts 5 page -->
                                                                    <div class="tab-pane fade" id="v-pills-contact5" role="tabpanel">
                                                                        <!-- Contact description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.contactDescr_5" type="text" name="contactDescr_5" id="inputContactDescr_5" placeholder="" autocomplete="contactDescr_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="contactDescription()">
                                                                        </div>
                                                                        <!-- Contact name -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Name:</span>
                                                                            </div>
                                                                            <input v-model="form.contactName_5" type="text" name="contactName_5" placeholder="" autocomplete="contactName_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact phone -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Phone:</span>
                                                                            </div>
                                                                            <input v-model="form.contactPhone_5" type="text" name="contactPhone_5" placeholder="" autocomplete="contactPhone_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact mobile -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Mobile:</span>
                                                                            </div>
                                                                            <input v-model="form.contactMobile_5" type="text" name="contactMobile_5" placeholder="" autocomplete="contactMobile_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact fax -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Fax:</span>
                                                                            </div>
                                                                            <input v-model="form.contactFax_5" type="text" name="contactFax_5" placeholder="" autocomplete="contactFax_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <hr/>
                                                                        <!-- Contact email -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Email:</span>
                                                                            </div>
                                                                            <input v-model="form.contactEmail_5" type="text" name="contactEmail_5" placeholder="" autocomplete="contactEmail_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Contact web -->
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Web:</span>
                                                                            </div>
                                                                            <input v-model="form.contactWeb_5" type="text" name="contactWeb_5" placeholder="" autocomplete="contactWeb_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- Contacts 5 page -->                                                               


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- /Contacts content -->


                                                    </div>
                                                    <!-- /Contacts page -->

                                                    <!-- Addresses page -->
                                                    <div class="tab-pane fade show" id="v-pills-addresses" role="tabpanel">
                                                        <h5 class="card-title">Addresses</h5>
                                                        <hr/>
                                                        <!-- Addresses dropdown type menu -->
                                                        <div class="dropdown">
                                                            <button class="btn btn-secondary dropdown-toggle btn-block activeBtn" type="button" id="dropdownMenuButton_addresses" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                Select: Address Type
                                                            </button>
                                                            <div class="dropdown-menu">
                                                                <div class="nav flex-column nav-pills" id="v-pills-tabAddresses" role="tablist" aria-orientation="vertical">
                                                                    <a class="nav-link" id="v-pills-address1-tab" data-toggle="pill" href="#v-pills-address1" role="tab" aria-controls="v-pills-address1" aria-selected="true">Address 1</a>
                                                                    <a class="nav-link" id="v-pills-address2-tab" data-toggle="pill" href="#v-pills-address2" role="tab" aria-controls="v-pills-address2" aria-selected="false">Address 2</a>
                                                                    <a class="nav-link" id="v-pills-address3-tab" data-toggle="pill" href="#v-pills-address3" role="tab" aria-controls="v-pills-address3" aria-selected="false">Address 3</a>
                                                                    <a class="nav-link" id="v-pills-address4-tab" data-toggle="pill" href="#v-pills-address4" role="tab" aria-controls="v-pills-address4" aria-selected="false">Address 4</a>
                                                                    <a class="nav-link" id="v-pills-address5-tab" data-toggle="pill" href="#v-pills-address5" role="tab" aria-controls="v-pills-address5" aria-selected="false">Address 5</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- /Addresses dropdown type menu -->

                                                        <!-- Addresses content -->
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <div class="tab-content" id="v-pills-tabAddresses_Content">

                                                                    <!-- Address 1 page -->
                                                                    <div class="tab-pane fade show active" id="v-pills-address1" role="tabpanel">
                                                                        <!-- Address description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.addressDescr_1" type="text" name="addressDescr_1" id="inputAddressDescr_1" placeholder="" autocomplete="addressDescr_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="addressDescription()">
                                                                        </div>
                                                                        <!-- Address line1 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 1:</span>
                                                                            </div>
                                                                            <input v-model="form.address1_1" type="text" name="address1_1" id="inputAddress1_1" placeholder="" autocomplete="address1_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address line2 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 2:</span>
                                                                            </div>
                                                                            <input v-model="form.address2_1" type="text" name="address2_1" id="inputAddress2_1" placeholder="" autocomplete="address2_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address city -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">City:</span>
                                                                            </div>
                                                                            <input v-model="form.address3_1" type="text" name="address3_1" id="inputAddress3_1" placeholder="" autocomplete="address3_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address state -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">State:</span>
                                                                            </div>
                                                                            <input v-model="form.address4_1" type="text" name="address4_1" id="inputAddress4_1" placeholder="" autocomplete="address4_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address postcode -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Postcode:</span>
                                                                            </div>
                                                                            <input v-model="form.address5_1" type="text" name="address5_1" id="inputAddress5_1" placeholder="" autocomplete="address5_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address country -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Country:</span>
                                                                            </div>
                                                                            <input v-model="form.address6_1" type="text" name="address6_1" id="inputAddress6_1" placeholder="" autocomplete="address6_1"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Address 1 page -->

                                                                    <!-- Address 2 page -->
                                                                    <div class="tab-pane fade" id="v-pills-address2" role="tabpanel">
                                                                        <!-- Address description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.addressDescr_2" type="text" name="addressDescr_2" id="inputAddressDescr_2" placeholder="" autocomplete="addressDescr_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="addressDescription()">
                                                                        </div>
                                                                        <!-- Address line1 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 1:</span>
                                                                            </div>
                                                                            <input v-model="form.address1_2" type="text" name="address1_2" id="inputAddress1_2" placeholder="" autocomplete="address1_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address line2 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 2:</span>
                                                                            </div>
                                                                            <input v-model="form.address2_2" type="text" name="address2_2" id="inputAddress2_2" placeholder="" autocomplete="address2_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address city -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">City:</span>
                                                                            </div>
                                                                            <input v-model="form.address3_2" type="text" name="address3_2" id="inputAddress3_2" placeholder="" autocomplete="address3_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address state -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">State:</span>
                                                                            </div>
                                                                            <input v-model="form.address4_2" type="text" name="address4_2" id="inputAddress4_2" placeholder="" autocomplete="address4_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address postcode -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Postcode:</span>
                                                                            </div>
                                                                            <input v-model="form.address5_2" type="text" name="address5_2" id="inputAddress5_2" placeholder="" autocomplete="address5_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address country -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Country:</span>
                                                                            </div>
                                                                            <input v-model="form.address6_2" type="text" name="address6_2" id="inputAddress6_2" placeholder="" autocomplete="address6_2"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Address 2 page -->    

                                                                    <!-- Address 3 page -->
                                                                    <div class="tab-pane fade" id="v-pills-address3" role="tabpanel">
                                                                        <!-- Address description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.addressDescr_3" type="text" name="addressDescr_3" id="inputAddressDescr_3" placeholder="" autocomplete="addressDescr_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="addressDescription()">
                                                                        </div>
                                                                        <!-- Address line1 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 1:</span>
                                                                            </div>
                                                                            <input v-model="form.address1_3" type="text" name="address1_3" id="inputAddress1_3" placeholder="" autocomplete="address1_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address line2 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 2:</span>
                                                                            </div>
                                                                            <input v-model="form.address2_3" type="text" name="address2_3" id="inputAddress2_3" placeholder="" autocomplete="address2_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address city -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">City:</span>
                                                                            </div>
                                                                            <input v-model="form.address3_3" type="text" name="address3_3" id="inputAddress3_3" placeholder="" autocomplete="address3_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address state -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">State:</span>
                                                                            </div>
                                                                            <input v-model="form.address4_3" type="text" name="address4_3" id="inputAddress4_3" placeholder="" autocomplete="address4_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address postcode -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Postcode:</span>
                                                                            </div>
                                                                            <input v-model="form.address5_3" type="text" name="address5_3" id="inputAddress5_3" placeholder="" autocomplete="address5_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address country -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Country:</span>
                                                                            </div>
                                                                            <input v-model="form.address6_3" type="text" name="address6_3" id="inputAddress6_3" placeholder="" autocomplete="address6_3"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>                                                            
                                                                    <!-- /Address 3 page -->

                                                                    <!-- Address 4 page -->
                                                                    <div class="tab-pane fade" id="v-pills-address4" role="tabpanel">
                                                                        <!-- Address description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.addressDescr_4" type="text" name="addressDescr_4" id="inputAddressDescr_4" placeholder="" autocomplete="addressDescr_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="addressDescription()">
                                                                        </div>
                                                                        <!-- Address line1 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 1:</span>
                                                                            </div>
                                                                            <input v-model="form.address1_4" type="text" name="address1_4" id="inputAddress1_4" placeholder="" autocomplete="address1_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address line2 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 2:</span>
                                                                            </div>
                                                                            <input v-model="form.address2_4" type="text" name="address2_4" id="inputAddress2_4" placeholder="" autocomplete="address2_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address city -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">City:</span>
                                                                            </div>
                                                                            <input v-model="form.address3_4" type="text" name="address3_4" id="inputAddress3_4" placeholder="" autocomplete="address3_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address state -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">State:</span>
                                                                            </div>
                                                                            <input v-model="form.address4_4" type="text" name="address4_4" id="inputAddress4_4" placeholder="" autocomplete="address4_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address postcode -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Postcode:</span>
                                                                            </div>
                                                                            <input v-model="form.address5_4" type="text" name="address5_4" id="inputAddress5_4" placeholder="" autocomplete="address5_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address country -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Country:</span>
                                                                            </div>
                                                                            <input v-model="form.address6_4" type="text" name="address6_4" id="inputAddress6_4" placeholder="" autocomplete="address6_4"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Address 4 page -->

                                                                    <!-- Address 5 page -->
                                                                    <div class="tab-pane fade" id="v-pills-address5" role="tabpanel">
                                                                        <!-- Address description -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Description:</span>
                                                                            </div>
                                                                            <input v-model="form.addressDescr_5" type="text" name="addressDescr_5" id="inputAddressDescr_5" placeholder="" autocomplete="addressDescr_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" @change="addressDescription()">
                                                                        </div>
                                                                        <!-- Address line1 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 1:</span>
                                                                            </div>
                                                                            <input v-model="form.address1_5" type="text" name="address1_5" id="inputAddress1_5" placeholder="" autocomplete="address1_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address line2 -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Line 2:</span>
                                                                            </div>
                                                                            <input v-model="form.address2_5" type="text" name="address2_5" id="inputAddress2_5" placeholder="" autocomplete="address2_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address city -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">City:</span>
                                                                            </div>
                                                                            <input v-model="form.address3_5" type="text" name="address3_5" id="inputAddress3_5" placeholder="" autocomplete="address3_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address state -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">State:</span>
                                                                            </div>
                                                                            <input v-model="form.address4_5" type="text" name="address4_5" id="inputAddress4_5" placeholder="" autocomplete="address4_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address postcode -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Postcode:</span>
                                                                            </div>
                                                                            <input v-model="form.address5_5" type="text" name="address5_5" id="inputAddress5_5" placeholder="" autocomplete="address5_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                        <!-- Address country -->
                                                                        <div class="input-group my-3">
                                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                                <span class="input-group-text input-group-prepend-100">Country:</span>
                                                                            </div>
                                                                            <input v-model="form.address6_5" type="text" name="address6_5" id="inputAddress6_5" placeholder="" autocomplete="address6_5"
                                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                        </div>
                                                                    </div>
                                                                    <!-- /Address 5 page -->

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Addresses content -->

                                                    </div>
                                                    <!-- /Addresses page -->

                                                    <!-- Settings page -->
                                                     <div class="tab-pane fade show" id="v-pills-settings" role="tabpanel">
                                                        <!-- Settings title -->
                                                        <div class="row no-gutters">
                                                            <div class="col-5">
                                                                <span class="mt-2 pt-4"><h5 class="card-title">Settings</h5></span>
                                                            </div>
                                                            <div class="col-5 text-right mt-1">
                                                                Enable: &nbsp;
                                                            </div>
                                                            <div class="col-2 text-right">
                                                                <!-- Settings active -->
                                                                 <label class="switch">
                                                                    <input type="checkbox" id="organisationActive" v-model="form.active">
                                                                    <span class="slider round"></span>
                                                                </label> 
                                                            </div>
                                                        </div>
                                                        <hr style="margin-top: -30x"/>
                                                        <!-- Settings key -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Key:</span>
                                                            </div>
                                                            <input v-model="form.key" type="text" name="key" id="key" disabled 
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                            <div class="input-group-append">
                                                                <button @click="generateKey" type="button" class="btn btn-secondary"><i class="fas fa-plus-square"></i></button>
                                                            </div>
                                                        </div>
                                                        <!-- Settings prefix / suffix -->
                                                        <div class="input-group my-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Prefix / suffix:</span>
                                                            </div>
                                                            <input v-model="form.keyPrefix" type="text" name="keyPrefix" placeholder="" autocomplete="keyPrefix"
                                                                    class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" >
                                                            <input v-model="form.keySuffix" type="text" name="keySuffix" placeholder="" autocomplete="keySuffix"
                                                                    class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }" >
                                                        </div>
                                                        <!-- Settings key length -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Key Length:</span>
                                                            </div>
                                                            <input v-model="form.keyLength" type="text" name="keyLength" placeholder="Key Length" autocomplete="keyLength"
                                                                class="form-control" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                        </div>
                                                        <!-- Settings security level -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Key Level:</span>
                                                            </div>
                                                            <select v-model="form.keyLevel" id="keyLevel" name="keyLevel" placeholder="Security key level" autocomplete="keyLevel" 
                                                                    class="form-control custom-select" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                    <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                        <hr/>
                                                        <!-- Settings owner -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Owner:</span>
                                                            </div>
                                                            <select v-model="form.ownerID" id="ownerID" name="ownerID" placeholder="Company administrator" autocomplete="ownerID" 
                                                                    class="form-control custom-select" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                    <option v-for="adminUser in data_adminUsers" :key="adminUser.id" :value="adminUser.id">{{adminUser.name}}</option>
                                                            </select>
                                                        </div>
                                                        <!-- Settings administrator -->
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend input-group-prepend-100">
                                                                <span class="input-group-text input-group-prepend-100">Admin user:</span>
                                                            </div>
                                                            <select v-model="form.adminID" id="adminID" name="adminID" placeholder="Company administrator" autocomplete="admin"
                                                                    class="form-control custom-select" :class="{ 'is-invalid': this.isEmpty(form.errors, _) }">
                                                                    <option v-for="adminUser in data_adminUsers" :key="adminUser.id" :value="adminUser.id">{{adminUser.name}}</option>
                                                                </select>
                                                        </div>
                                                    </div>
                                                    <!-- /Settings page -->

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- /Modal Body-->

                        <!-- Modal Footer-->
                        <div class="modal-footer">
                            <button type="button" id="modal-close" class="btn btn-secondary activeBtn" @click="closeOrganisation">Cancel</button>
                            <button type="submit" id="modal-save" class="btn btn-primary">Save</button>
                        </div>
                        <!-- /Modal Footer-->                        

                    </div>
                </div>
            </div>
        </form>
        <!-- /Modal Organisation -->

</div>

</template>

<script>
import $ from 'jquery'
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import { nextTick } from 'q';

export default {
    name: 'Organisation',
    data() {
        return {
            organisationListing: {},
            data_companies: {},
            data_adminUsers: {},
            form: {
                status: 'New', edited: false,
                id: 0,
                key: '', keyPrefix: '', keySuffix: '', keyLength: '5', keyLevel: '1',
                name: '', alias: '', iconFile64: '', preIconFile: '', iconFile: '',
                about: '', generalNotes: '', terms: '',
                phone_1: '', phone_2: '', phone_3: '', email: '', web: '', 
                addressDescr_1: '', address1_1: '', address2_1: '', address3_1: '', address4_1: '', address5_1: '', address6_1: '', 
                addressDescr_2: '', address1_2: '', address2_2: '', address3_2: '', address4_2: '', address5_2: '', address6_2: '', 
                addressDescr_3: '', address1_3: '', address2_3: '', address3_3: '', address4_3: '', address5_3: '', address6_3: '', 
                addressDescr_4: '', address1_4: '', address2_4: '', address3_4: '', address4_4: '', address5_4: '', address6_4: '', 
                addressDescr_5: '', address1_5: '', address2_5: '', address3_5: '', address4_5: '', address5_5: '', address6_5: '', 
                contactDescr_1: '', contactName_1: '', contactPhone_1: '', contactMobile_1: '', contactFax_1: '', contactEmail_1: '', contactWeb_1: '', 
                contactDescr_2: '', contactName_2: '', contactPhone_2: '', contactMobile_2: '', contactFax_2: '', contactEmail_2: '', contactWeb_2: '', 
                contactDescr_3: '', contactName_3: '', contactPhone_3: '', contactMobile_3: '', contactFax_3: '', contactEmail_3: '', contactWeb_3: '', 
                contactDescr_4: '', contactName_4: '', contactPhone_4: '', contactMobile_4: '', contactFax_4: '', contactEmail_4: '', contactWeb_4: '', 
                contactDescr_5: '', contactName_5: '', contactPhone_5: '', contactMobile_5: '', contactFax_5: '', contactEmail_5: '', contactWeb_5: '', 
                owner_id: 0, admin_id: 0, 
                public: 0, 
                active: 0, activatedBy: 0, activated_at: '', 
                deActivatedBy: 0, deActivated_at: '', 
                recStatus: 0, deletedBy: 0, deleted_at: '', 
                createdBy: 0, created_at: '', updatedBy: 0, updated_at: '',
                errors: [],
            },
        }
    },
    computed: {
        ...mapGetters({
            verified: 'auth/verified',
            user: 'auth/user',
            activeOrganisation: 'auth/activeOrganisation',
        }),
    },
    mounted() {
        this.get_organisationListing();

        $('#formOrganisation :input').change(()=>{
            this.form.edited = true;
        });           
    },
    methods: {
        ...mapActions({
            setActiveOrganisation: 'auth/setActiveOrganisation'
        }), 
        deactivateOrganisation(organisation) {
            
            this.$Progress.start()
            try{
                // Set all organisations to de activated
                for (var i = 0; i < this.organisationListing.data.length; i++) {
                    this.organisationListing.data[i].activeOrganisation = 0;
                    this.organisationListing.data[i].IsDeactivate = 0;
                    this.organisationListing.data[i].IsActivate = 1;
                }          
                this.setActiveOrganisation(0)
                nextTick(() => { this.updateOrganisation(organisation, 1) });

                this.$Progress.finish();
            }
            catch (e) {
                window.toast.fire({ icon: "error", title: e }); 
                this.$Progress.fail();
            }
        },
        activateOrganisation(organisation) {

            this.$Progress.start()
            try{
                // Set all organisations to de activated
                for (var i = 0; i < this.organisationListing.data.length; i++) {
                    this.organisationListing.data[i].activeOrganisation = 0;
                    this.organisationListing.data[i].IsDeactivate = 0;
                    this.organisationListing.data[i].IsActivate = 1;
                }
                organisation.activeOrganisation = 1;
                organisation.IsDeactivate = 1;
                organisation.IsActivate = 0;
                this.setActiveOrganisation(organisation.id)     
                nextTick(() => { this.updateOrganisation(organisation, 2) });

                this.$Progress.finish();
            }
            catch (e) {
                window.toast.fire({ icon: "error", title: e }); 
                this.$Progress.fail();
            }                
        },
        disableOrganisation(organisation) {

            this.$Progress.start()
            try{
                // Disable the organisation
                organisation.IsEnable = 1;
                organisation.IsDisable = 0;
                organisation.IsActivate = 0;
                organisation.active = 0;
                nextTick(() => { this.updateOrganisation(organisation, 3) });

                this.$Progress.finish();
            }
            catch (e) {
                window.toast.fire({ icon: "error", title: e }); 
                this.$Progress.fail();
            }              
        },
        enableOrganisation(organisation) {

            this.$Progress.start()
            try{            
                // Enable the organisation
                organisation.IsEnable = 0;
                organisation.IsDisable = 1;
                organisation.IsActivate = 1;
                organisation.active = 1;
                nextTick(() => { this.updateOrganisation(organisation, 4) });

                this.$Progress.finish();
            }
            catch (e) {
                window.toast.fire({ icon: "error", title: e }); 
                this.$Progress.fail();
            }                  
        },
        deleteOrganisation(organisation) {
            window.swal.fire({
                title: 'Are you sure ?',
                text: "If you delete " + organisation.name + " it will no longer be available to ALL users.",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete',
                animation:false,
                focusCancel:true
                })
                .then((result) => {
                    if (result.value) {
                        organisation.recStatus = 1;
                        this.updateOrganisation(organisation, 0);

                        nextTick(() => {                           
   
                            // Check which page to load
                            var $pageref = 1
                            if((this.organisationListing.current_page * this.organisationListing.per_page)
                               - this.organisationListing.per_page < (this.organisationListing.total-1))
                            {
                                $pageref = this.organisationListing.current_page
                            }else{
                                $pageref = this.organisationListing.current_page - 1
                            }

                            this.get_organisationListing($pageref)
                            window.toast.fire({ icon: 'success', title: organisation.name + ' has been deleted' })

                            })
                        
                        }
                    })
        },
        unlinkOrganisation(organisation) {
            window.swal.fire({
                title: 'Are you sure ?',
                text: "If you unlink " + organisation.name + " it will no longer be available. You will require an administrator to relink the organisation.",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Unlink',
                animation:false,
                focusCancel:true
                })
                .then((result) => {
                    if (result.value) {
                        organisation.linkStatus = 1;
                        this.updateOrganisation(organisation, 0);

                        nextTick(() => {                           
   
                            // Check which page to load
                            var $pageref = 1
                            if((this.organisationListing.current_page * this.organisationListing.per_page)
                               - this.organisationListing.per_page < (this.organisationListing.total-1))
                            {
                                $pageref = this.organisationListing.current_page
                            }else{
                                $pageref = this.organisationListing.current_page - 1
                            }

                            this.get_organisationListing($pageref)
                            window.toast.fire({ icon: 'success', title: organisation.name + ' has been un-linked' })

                            })
                        
                        }
                    })
        },
        newOrganisation() { 
            this.$Progress.start()
            this.resetForm();

            this.form.status='New';
            $("#formOrganisation :input").prop("disabled", false);

            this.form.owner_id = this.user.id;
            this.form.adminID = this.user.id;
            $('#ownerID').prop('disabled', true);
            $('#adminID').prop('disabled', true); 

            $("#modal-save").removeClass('d-none');
            $('#key').prop('disabled', true);

            $('#v-pills-tab a[href="#v-pills-details"]').tab('show');
            $('#v-pills-tabNotes a[href="#v-pills-genNotes"]').tab('show');
            $('#v-pills-tabAddresses a[href="#v-pills-address1"]').tab('show');
            $('#v-pills-tabContacts a[href="#v-pills-contact1"]').tab('show');                 

            $('#organisationModal').modal('show');
            this.contactDescription();
            this.addressDescription();  

            this.$Progress.finish();
        },
        editOrganisation(organisation) {
            this.$Progress.start()
            this.resetForm();

            this.form.status='Edit';
            this.fillForm(organisation);
            //this.loadAdminUsers(organisation.id);        
            $("#formCompany :input").prop("disabled", false);

                $("#modal-close").html('Cancel');
                $("#modal-save").removeClass('d-none');
                $('#key').prop('disabled', true);

                $('#v-pills-tab a[href="#v-pills-details"]').tab('show');
                $('#v-pills-tabNotes a[href="#v-pills-genNotes"]').tab('show');
                $('#v-pills-tabAddresses a[href="#v-pills-address1"]').tab('show');
                $('#v-pills-tabContacts a[href="#v-pills-contact1"]').tab('show');
 
                if(this.activeOrganisation==organisation.id)
                {
                    $("#organisationActive").prop("disabled", true);
                }

            this.getCompanyIcon()

            $('#organisationModal').modal('show');
            this.contactDescription();
            this.addressDescription();  

            this.$Progress.finish();
        },
        viewOrganisation(organisation) {
            this.$Progress.start()
            this.resetForm();

            this.form.status='View';
            this.fillForm(organisation);
             //this.loadAdminUsers(organisation.id); 
            $("#formOrganisation :input").prop("disabled", true);
            $('#key').prop('disabled', true);
            $("#modal-close").html('Close');
            $("#modal-save").addClass('d-none');               

            $(".activeBtn").prop("disabled", false);

            $('#v-pills-tab a[href="#v-pills-details"]').tab('show');
            $('#v-pills-tabNotes a[href="#v-pills-genNotes"]').tab('show');
            $('#v-pills-tabAddresses a[href="#v-pills-address1"]').tab('show');
            $('#v-pills-tabContacts a[href="#v-pills-contact1"]').tab('show');

            $('#organisationModal').modal('show');
            this.contactDescription();
            this.addressDescription();  

            this.$Progress.finish();
        }, 
        resetForm() {
                this.form.status= 'new'; this.form.edited= false;
                this.form.id= 0;
                this.form.key= ''; this.form.keyPrefix= ''; this.form.keySuffix= ''; this.form.keyLength= '5', this.form.keyLevel= '1';
                this.form.name= ''; this.form.alias= ''; this.form.iconFile= ''; this.form.iconFile64= '';
                this.form.about= ''; this.form.generalNotes= ''; this.form.terms= '';
                this.form.phone_1= ''; this.form.phone_2= ''; this.form.phone_3= ''; this.form.email= ''; this.form.web= ''; 
                this.form.addressDescr_1= ''; this.form.address1_1= ''; this.form.address2_1= ''; this.form.address3_1= ''; this.form.address4_1= ''; this.form.address5_1= ''; this.form.address6_1= ''; 
                this.form.addressDescr_2= ''; this.form.address1_2= ''; this.form.address2_2= ''; this.form.address3_2= ''; this.form.address4_2= ''; this.form.address5_2= ''; this.form.address6_2= ''; 
                this.form.addressDescr_3= ''; this.form.address1_3= ''; this.form.address2_3= ''; this.form.address3_3= ''; this.form.address4_3= ''; this.form.address5_3= ''; this.form.address6_3= ''; 
                this.form.addressDescr_4= ''; this.form.address1_4= ''; this.form.address2_4= ''; this.form.address3_4= ''; this.form.address4_4= ''; this.form.address5_4= ''; this.form.address6_4= ''; 
                this.form.addressDescr_5= ''; this.form.address1_5= ''; this.form.address2_5= ''; this.form.address3_5= ''; this.form.address4_5= ''; this.form.address5_5= ''; this.form.address6_5= ''; 
                this.form.contactDescr_1= ''; this.form.contactName_1= ''; this.form.contactPhone_1= ''; this.form.contactMobile_1= ''; this.form.contactFax_1= ''; this.form.contactEmail_1= ''; this.form.contactWeb_1= ''; 
                this.form.contactDescr_2= ''; this.form.contactName_2= ''; this.form.contactPhone_2= ''; this.form.contactMobile_2= ''; this.form.contactFax_2= ''; this.form.contactEmail_2= ''; this.form.contactWeb_2= ''; 
                this.form.contactDescr_3= ''; this.form.contactName_3= ''; this.form.contactPhone_3= ''; this.form.contactMobile_3= ''; this.form.contactFax_3= ''; this.form.contactEmail_3= ''; this.form.contactWeb_3= ''; 
                this.form.contactDescr_4= ''; this.form.contactName_4= ''; this.form.contactPhone_4= ''; this.form.contactMobile_4= ''; this.form.contactFax_4= ''; this.form.contactEmail_4= ''; this.form.contactWeb_4= ''; 
                this.form.contactDescr_5= ''; this.form.contactName_5= ''; this.form.contactPhone_5= ''; this.form.contactMobile_5= ''; this.form.contactFax_5= ''; this.form.contactEmail_5= ''; this.form.contactWeb_5= ''; 
                this.form.owner_id= 0; this.form.admin_id= 0; 
                this.form.public= 0;
                this.form.active= 0; this.form.activatedBy= 0; this.form.activated_at= '';
                this.form.deActivatedBy= 0; this.form.deActivated_at= '';
                this.form.recStatus= 0; this.form.deletedBy= 0; this.form.deleted_at= ''; 
                this.form.createdBy= 0; this.form.created_at= ''; this.form.updatedBy= 0; this.form.updated_at= '';
                this.form.errors= [];
        },
        fillForm(organisation) {
                this.form.edited= false;
                this.form.id= organisation.id;
                this.form.key= organisation.key; this.form.keyPrefix= organisation.keyPrefix; this.form.keySuffix= organisation.keySuffix; this.form.keyLength= '5', this.form.keyLevel= '1';
                this.form.name= organisation.name; this.form.alias= organisation.alias; this.form.iconFile= organisation.iconFile; this.form.iconFile64= organisation.iconFile64;
                this.form.about= organisation.about; this.form.generalNotes= organisation.generalNotes; this.form.terms= organisation.terms;
                this.form.phone_1= organisation.phone_1; this.form.phone_2= organisation.phone_2; this.form.phone_3= organisation.phone_3; this.form.email= organisation.email; this.form.web= organisation.web; 
                this.form.addressDescr_1= organisation.addressDescr_1; this.form.address1_1= organisation.address1_1; this.form.address2_1= organisation.address2_1; this.form.address3_1= organisation.address3_1; this.form.address4_1= organisation.address4_1; this.form.address5_1= organisation.address5_1; this.form.address6_1= organisation.address6_1; 
                this.form.addressDescr_2= organisation.addressDescr_2; this.form.address1_2= organisation.address1_2; this.form.address2_2= organisation.address2_2; this.form.address3_2= organisation.address3_2; this.form.address4_2= organisation.address4_2; this.form.address5_2= organisation.address5_2; this.form.address6_2= organisation.address6_2; 
                this.form.addressDescr_3= organisation.addressDescr_3; this.form.address1_3= organisation.address1_3; this.form.address2_3= organisation.address2_3; this.form.address3_3= organisation.address3_3; this.form.address4_3= organisation.address4_3; this.form.address5_3= organisation.address5_3; this.form.address6_3= organisation.address6_3;
                this.form.addressDescr_4= organisation.addressDescr_4; this.form.address1_4= organisation.address1_4; this.form.address2_4= organisation.address2_4; this.form.address3_4= organisation.address3_4; this.form.address4_4= organisation.address4_4; this.form.address5_4= organisation.address5_4; this.form.address6_4= organisation.address6_4; 
                this.form.addressDescr_5= organisation.addressDescr_5; this.form.address1_5= organisation.address1_5; this.form.address2_5= organisation.address2_5; this.form.address3_5= organisation.address3_5; this.form.address4_5= organisation.address4_5; this.form.address5_5= organisation.address5_5; this.form.address6_5= organisation.address6_5; 
                this.form.contactDescr_1= organisation.contactDescr_1; this.form.contactName_1= organisation.contactName_1; this.form.contactPhone_1= organisation.contactPhone_1; this.form.contactMobile_1= organisation.contactMobile_1; this.form.contactFax_1= organisation.contactFax_1; this.form.contactEmail_1= organisation.contactEmail_1; this.form.contactWeb_1= organisation.contactWeb_1; 
                this.form.contactDescr_2= organisation.contactDescr_2; this.form.contactName_2= organisation.contactName_2; this.form.contactPhone_2= organisation.contactPhone_2; this.form.contactMobile_2= organisation.contactMobile_2; this.form.contactFax_2= organisation.contactFax_2; this.form.contactEmail_2= organisation.contactEmail_2; this.form.contactWeb_2= organisation.contactWeb_2; 
                this.form.contactDescr_3= organisation.contactDescr_3; this.form.contactName_3= organisation.contactName_3; this.form.contactPhone_3= organisation.contactPhone_3; this.form.contactMobile_3= organisation.contactMobile_3; this.form.contactFax_3= organisation.contactFax_3; this.form.contactEmail_3= organisation.contactEmail_3; this.form.contactWeb_3= organisation.contactWeb_3; 
                this.form.contactDescr_4= organisation.contactDescr_4; this.form.contactName_4= organisation.contactName_4; this.form.contactPhone_4= organisation.contactPhone_4; this.form.contactMobile_4= organisation.contactMobile_4; this.form.contactFax_4= organisation.contactFax_4; this.form.contactEmail_4= organisation.contactEmail_4; this.form.contactWeb_4= organisation.contactWeb_4; 
                this.form.contactDescr_5= organisation.contactDescr_5; this.form.contactName_5= organisation.contactName_5; this.form.contactPhone_5= organisation.contactPhone_5; this.form.contactMobile_5= organisation.contactMobile_5; this.form.contactFax_5= organisation.contactFax_5; this.form.contactEmail_5= organisation.contactEmail_5; this.form.contactWeb_5= organisation.contactWeb_5; 
                this.form.owner_id= organisation.owner_id; this.form.admin_id= organisation.admin_id; 
                this.form.public= organisation.public;
                this.form.active= organisation.active; this.form.activatedBy= organisation.activatedBy; this.form.activated_at= organisation.activated_at;
                this.form.deActivatedBy= organisation.deActivatedBy; this.form.deActivated_at= organisation.deActivated_at;
                this.form.recStatus= organisation.recStatus; this.form.deletedBy= organisation.deletedBy; this.form.deleted_at= organisation.deleted_at; 
                this.form.createdBy= organisation.createdBy; this.form.created_at= organisation.created_at; this.form.updatedBy= organisation.updatedBy; this.form.updated_at= organisation.updated_at;
                this.form.errors= [];
        },
        updateFromForm(curentOrg) {

                curentOrg.name= this.form.name;
                curentOrg.keyPrefix= this.form.keyPrefix; curentOrg.keySuffix= this.form.keySuffix; curentOrg.keyLength= '5', curentOrg.keyLevel= '1';
                curentOrg.name= this.form.name; curentOrg.alias= this.form.alias; curentOrg.iconFile= this.form.iconFile; curentOrg.iconFile64= this.form.iconFile64;
                curentOrg.about= this.form.about; curentOrg.generalNotes= this.form.generalNotes; curentOrg.terms= this.form.terms;
                curentOrg.phone_1= this.form.phone_1; curentOrg.phone_2= this.form.phone_2; curentOrg.phone_3= this.form.phone_3; curentOrg.email= this.form.email; curentOrg.web= this.form.web; 
                curentOrg.addressDescr_1= this.form.addressDescr_1; curentOrg.address1_1= this.form.address1_1; curentOrg.address2_1= this.form.address2_1; curentOrg.address3_1= this.form.address3_1; curentOrg.address4_1= this.form.address4_1; curentOrg.address5_1= this.form.address5_1; curentOrg.address6_1= this.form.address6_1; 
                curentOrg.addressDescr_2= this.form.addressDescr_2; curentOrg.address1_2= this.form.address1_2; curentOrg.address2_2= this.form.address2_2; curentOrg.address3_2= this.form.address3_2; curentOrg.address4_2= this.form.address4_2; curentOrg.address5_2= this.form.address5_2; curentOrg.address6_2= this.form.address6_2; 
                curentOrg.addressDescr_3= this.form.addressDescr_3; curentOrg.address1_3= this.form.address1_3; curentOrg.address2_3= this.form.address2_3; curentOrg.address3_3= this.form.address3_3; curentOrg.address4_3= this.form.address4_3; curentOrg.address5_3= this.form.address5_3; curentOrg.address6_3= this.form.address6_3;
                curentOrg.addressDescr_4= this.form.addressDescr_4; curentOrg.address1_4= this.form.address1_4; curentOrg.address2_4= this.form.address2_4; curentOrg.address3_4= this.form.address3_4; curentOrg.address4_4= this.form.address4_4; curentOrg.address5_4= this.form.address5_4; curentOrg.address6_4= this.form.address6_4; 
                curentOrg.addressDescr_5= this.form.addressDescr_5; curentOrg.address1_5= this.form.address1_5; curentOrg.address2_5= this.form.address2_5; curentOrg.address3_5= this.form.address3_5; curentOrg.address4_5= this.form.address4_5; curentOrg.address5_5= this.form.address5_5; curentOrg.address6_5= this.form.address6_5; 
                curentOrg.contactDescr_1= this.form.contactDescr_1; curentOrg.contactName_1= this.form.contactName_1; curentOrg.contactPhone_1= this.form.contactPhone_1; curentOrg.contactMobile_1= this.form.contactMobile_1; curentOrg.contactFax_1= this.form.contactFax_1; curentOrg.contactEmail_1= this.form.contactEmail_1; curentOrg.contactWeb_1= this.form.contactWeb_1; 
                curentOrg.contactDescr_2= this.form.contactDescr_2; curentOrg.contactName_2= this.form.contactName_2; curentOrg.contactPhone_2= this.form.contactPhone_2; curentOrg.contactMobile_2= this.form.contactMobile_2; curentOrg.contactFax_2= this.form.contactFax_2; curentOrg.contactEmail_2= this.form.contactEmail_2; curentOrg.contactWeb_2= this.form.contactWeb_2; 
                curentOrg.contactDescr_3= this.form.contactDescr_3; curentOrg.contactName_3= this.form.contactName_3; curentOrg.contactPhone_3= this.form.contactPhone_3; curentOrg.contactMobile_3= this.form.contactMobile_3; curentOrg.contactFax_3= this.form.contactFax_3; curentOrg.contactEmail_3= this.form.contactEmail_3; curentOrg.contactWeb_3= this.form.contactWeb_3; 
                curentOrg.contactDescr_4= this.form.contactDescr_4; curentOrg.contactName_4= this.form.contactName_4; curentOrg.contactPhone_4= this.form.contactPhone_4; curentOrg.contactMobile_4= this.form.contactMobile_4; curentOrg.contactFax_4= this.form.contactFax_4; curentOrg.contactEmail_4= this.form.contactEmail_4; curentOrg.contactWeb_4= this.form.contactWeb_4; 
                curentOrg.contactDescr_5= this.form.contactDescr_5; curentOrg.contactName_5= this.form.contactName_5; curentOrg.contactPhone_5= this.form.contactPhone_5; curentOrg.contactMobile_5= this.form.contactMobile_5; curentOrg.contactFax_5= this.form.contactFax_5; curentOrg.contactEmail_5= this.form.contactEmail_5; curentOrg.contactWeb_5= this.form.contactWeb_5; 
                curentOrg.owner_id= this.form.owner_id; curentOrg.admin_id= this.form.admin_id; 
                curentOrg.public= this.form.public;
                curentOrg.active= this.form.active; curentOrg.activatedBy= this.form.activatedBy; curentOrg.activated_at= this.form.activated_at;
                curentOrg.deActivatedBy= this.form.deActivatedBy; curentOrg.deActivated_at= this.form.deActivated_at;
                curentOrg.recStatus= this.form.recStatus; curentOrg.deletedBy= this.form.deletedBy; curentOrg.deleted_at= this.form.deleted_at; 
                curentOrg.createdBy= this.form.createdBy; curentOrg.created_at= this.form.created_at; curentOrg.updatedBy= this.form.updatedBy; curentOrg.updated_at= this.form.updated_at;

        },
        contactDescription() { 
            var contactDescr_1 = this.form.contactDescr_1;
            var contactDescr_2 = this.form.contactDescr_2;
            var contactDescr_3 = this.form.contactDescr_3;
            var contactDescr_4 = this.form.contactDescr_4;
            var contactDescr_5 = this.form.contactDescr_5;

            if(!contactDescr_1){ contactDescr_1 = 'Contact 1' }
            if(!contactDescr_2){ contactDescr_2 = 'Contact 2' }
            if(!contactDescr_3){ contactDescr_3 = 'Contact 3' }
            if(!contactDescr_4){ contactDescr_4 = 'Contact 4' }
            if(!contactDescr_5){ contactDescr_5 = 'Contact 5' }

            document.getElementById('v-pills-contact1-tab').innerHTML = contactDescr_1;
            document.getElementById('v-pills-contact2-tab').innerHTML = contactDescr_2;
            document.getElementById('v-pills-contact3-tab').innerHTML = contactDescr_3;
            document.getElementById('v-pills-contact4-tab').innerHTML = contactDescr_4;
            document.getElementById('v-pills-contact5-tab').innerHTML = contactDescr_5;        
        },
        addressDescription() { 
            var addressDescr_1 = this.form.addressDescr_1;
            var addressDescr_2 = this.form.addressDescr_2;
            var addressDescr_3 = this.form.addressDescr_3;
            var addressDescr_4 = this.form.addressDescr_4;
            var addressDescr_5 = this.form.addressDescr_5;

            if(!addressDescr_1){ addressDescr_1 = 'Address 1' }
            if(!addressDescr_2){ addressDescr_2 = 'Address 2' }
            if(!addressDescr_3){ addressDescr_3 = 'Address 3' }
            if(!addressDescr_4){ addressDescr_4 = 'Address 4' }
            if(!addressDescr_5){ addressDescr_5 = 'Address 5' }

            document.getElementById('v-pills-address1-tab').innerHTML = addressDescr_1;
            document.getElementById('v-pills-address2-tab').innerHTML = addressDescr_2;
            document.getElementById('v-pills-address3-tab').innerHTML = addressDescr_3;
            document.getElementById('v-pills-address4-tab').innerHTML = addressDescr_4;
            document.getElementById('v-pills-address5-tab').innerHTML = addressDescr_5;
        },
        closeOrganisation(){
            if(this.form.edited===true){
                window.swal.fire({
                    title: 'Discard changes',
                    text: "Your changes have not been saved.  Would you like to discard All changes ?.",
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Discard',
                    animation:false,
                    focusCancel:true
                    })
                    .then((result) => {
                        if (result.value) {
                            this.$Progress.start()
                            $('#organisationModal').modal('hide');
                            this.$Progress.finish();
                        }
                    })
            }else{
                $('#organisationModal').modal('hide');
            }        
        },
        saveOrganisation(){
            this.$Progress.start()

            if(this.form.status=='Edit')
            {
                if(this.form.edited===true){

                var curentOrg = [];

                // update the organisation
                    for (var i = 0; i < this.organisationListing.data.length; i++) {
                        if(this.organisationListing.data[i].id==this.form.id)
                        {
                            try{
                                curentOrg = this.organisationListing.data[i]
                                this.updateFromForm(curentOrg);
                                this.updateOrganisation(curentOrg, 5)
                                $('#organisationModal').modal('hide');
                                this.$Progress.finish()
                            }
                            catch (e) {
                                window.toast.fire({ icon: "error", title: e }); 
                                this.$Progress.fail();
                            } 
                        }
                    }   

                }else{
                    $('#organisationModal').modal('hide');
                    this.$Progress.finish()
                }
            }else{
                alert('save New');
                this.insertOrganisation(this.form)
            }
        },













        
        generateKey() {},
        getCardClass(status,active){
            // Get the class of class of the card and deisplay correct border colour
            if(status==1 && active==1)
            { return 'border-left-success'; }
            else if(active==0)
            { return 'border-left-danger'; }
            else
            { return 'border-left-primary'; }
        },
        getCardIcon(organisation) {
            // Get the Card logo image
            var logoImage = '';

            if(organisation.iconFile64){
                logoImage = organisation.iconFile64;
            }else if(organisation.iconFile){
                //logoImage = require('@/assets/organisations/logos/' + iconFile) 
                logoImage = organisation.iconFile
            }else{
                logoImage = require('@/assets/images/organisation.png')
            }
          
            return logoImage;
        },     
        getCompanyIcon(){
            // Get the Modal logo image
            let logoImage = '';

            if(this.form.iconFile64){
                logoImage = this.form.iconFile64;
            }else if(this.form.iconFile){
                logoImage = this.form.iconFile
            }else{
                logoImage = '';
            }
            return logoImage;
        },
        uploadLogo(fileName) {

            let file = fileName.target.files[0];
            let reader = new FileReader();
            this.form.preIconFile = file.name;
            this.form.iconFile = file.name;
 
            // Validate the image size
            if(file['size'] <= 2111775){

                reader.onloadend = ()=>{
                    this.form.iconFile64 = reader.result;
                }
                reader.readAsDataURL(file);
            }else{
                window.toast.fire({ icon: 'error', title: 'The logo file must be < 2mb.' })
            }
            
        },
        async get_organisationListing(page = 1){
            try {
                await axios.get("/auth/organisations/sawline?page=" + page)
                    .then((response) => { 
                        this.organisationListing = response.data.Organisations
                        
                    })
                    .catch(e => {
                        // Unsuccessful password reset
                        window.toast.fire({
                            icon: "error",
                            title: e
                        })
                    });
            } catch (e) {
                // Unknown error
                window.toast.fire({
                    icon: "error",
                    title: e
                })
            }
        },
       async updateOrganisation(organisation, $messageType) {
            try {
                await axios.post("/auth/organisations/update/" + organisation.id + "/sawline", {       
                        organisation: organisation
                    })
                    .then(() => { 
                        if($messageType==1)
                        { window.toast.fire({ icon: "success", title: organisation.name + ' has been de-activated'})}
                        else if($messageType==2)
                        { window.toast.fire({ icon: "success", title: organisation.name + ' has been activated'})}
                        else if($messageType==3)
                        { window.toast.fire({ icon: "success", title: organisation.name + ' has been disabled'})}
                        else if($messageType==4)
                        { window.toast.fire({ icon: "success", title: organisation.name + ' has been enabled'})} 
                        else if($messageType==5)
                        { window.toast.fire({ icon: "success", title: 'Changes saved to ' + organisation.name})}                                                
                    })
                    .catch(e => {
                        // Unsuccessful update
                        window.toast.fire({ icon: "error", title: e })
                    });
            } catch (e) {
                // Unknown error
                window.toast.fire({ icon: "error", title: e })
            }
        },
        async insertOrganisation(organisation) {
            try {
                await axios.post("/auth/organisations/create/sawline", {       
                        organisation: organisation
                    })
                    .then(() => { 
                         window.toast.fire({ icon: "success", title: organisation.name + ' has been created' })                                               
                    })
                    .catch(e => {
                        // Unsuccessful insert
                        window.toast.fire({ icon: "error", title: e })
                    });
            } catch (e) {
                // Unknown error
                window.toast.fire({ icon: "error", title: e })
            }
        },
        isEmpty(obj, name){
            var a = 1
            if(a==1){
                return Object.keys(obj).length!=0;
            }else{
                return name;
            }
        },
    },
}
</script>


  